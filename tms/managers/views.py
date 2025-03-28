from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from app_tms.models import Travel_Requests, Notes, Manager_Assignments
from app_tms.serializers import TravelRequestsSerializer
from app_tms.permissions import IsManager
from rest_framework.permissions import IsAuthenticated
from app_tms.utils import get_manager, can_approve_or_reject, send_email_notification, queryset_processor


def handle_manager_requests(request, id=None):
    """
    Handles various manager actions based on HTTP methods.
    """

    # --------------------- Handle GET requests ---------------------
    if request.method == 'GET':
        if id:
            return get_travel_request(request, id)  # Get details of a specific request
        return list_pending_requests(request)  # List all pending requests for the manager
       
    elif request.method == 'PATCH' and request.GET.get("status")=="approved" and id:
        return approve_travel_request(request, id)
    elif request.method == 'PATCH' and request.GET.get("status")=="rejected" and id:
        return reject_travel_request(request, id)
    elif request.method == 'POST' and id:
        return request_more_info(request, id)
    
    else:
        return Response({"error": "Invalid action specified."}, status=status.HTTP_400_BAD_REQUEST)

            

    # --------------------- Handle POST requests ---------------------

# ---------------------------------------------------------------------------------------------------

@api_view(["PATCH"])
@permission_classes([IsManager, IsAuthenticated])
def approve_travel_request(request, id):
    """
    Approve travel request - simplified version.
    Only checks that the ID exists and updates status.
    """
    try:
        # Just get the travel request by ID
        travel_request = Travel_Requests.objects.get(id=id)
        
        # Update status to approved
        travel_request.request_status = Travel_Requests.RequestStatusIndex.APPROVED
        travel_request.save()
        
        # Optional: Send notification
        try:
            send_email_notification(travel_request.employee, 
                                   "Travel Request Approved", 
                                   "Your request has been approved.")
        except Exception as e:
            # Don't fail if notification fails
            print(f"Failed to send notification: {str(e)}")
        
        return Response({"message": "Request approved."}, status=status.HTTP_200_OK)
    
    except Travel_Requests.DoesNotExist:
        return Response({"error": "Travel request not found."}, 
                       status=status.HTTP_404_NOT_FOUND)


@api_view(["PATCH"])
@permission_classes([IsManager, IsAuthenticated])
def reject_travel_request(request, id):
    """
    Reject travel request - simplified version.
    Only checks that the ID exists and updates status.
    """
    try:
        # Just get the travel request by ID
        travel_request = Travel_Requests.objects.get(id=id)
        
        # Update status to approved
        travel_request.request_status = Travel_Requests.RequestStatusIndex.REJECTED
        travel_request.save()
        
        # Optional: Send notification
        try:
            send_email_notification(travel_request.employee, 
                                   "Travel Request Rejected", 
                                   "Your request has been rejected.")
        except Exception as e:
            # Don't fail if notification fails
            print(f"Failed to send notification: {str(e)}")
        
        return Response({"message": "Request rejected."}, status=status.HTTP_200_OK)
    
    except Travel_Requests.DoesNotExist:
        return Response({"error": "Travel request not found."}, 
                       status=status.HTTP_404_NOT_FOUND)
# @api_view(["PATCH"])
# @permission_classes([IsManager, IsAuthenticated])
# def reject_travel_request(request, id):
#     """
#     Reject travel request.
#     """
#     travel_request = get_object_or_404(Travel_Requests, id=id)
#     if not can_approve_or_reject(travel_request, request.user):
#         return Response({"error": "Cannot reject this request."}, status=status.HTTP_403_FORBIDDEN)
    
#     travel_request.request_status = Travel_Requests.RequestStatusIndex.REJECTED
#     travel_request.save()

#     send_email_notification(travel_request.employee, "Travel Request Rejected", "Your request has been rejected.")
    
#     return Response({"message": "Request rejected."}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsManager, IsAuthenticated])
def list_pending_requests(request):
    """
    Lists all pending travel requests from employees assigned to the authenticated manager.
    """
    # Get the manager object for the current user
    manager = get_manager(request.user)
    if not manager:
        return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
    
    # First find all employees assigned to this manager
    assigned_employees = Manager_Assignments.objects.filter(manager=manager).values_list('employee', flat=True)
    
    # Then find all pending travel requests from those employees
    pending_requests = Travel_Requests.objects.filter(
        employee__in=assigned_employees,  # Employees assigned to this manager
        request_status=Travel_Requests.RequestStatusIndex.IN_PROGRESS
    )
    
    # Optional: Add ordering to show newest first
    pending_requests = pending_requests.order_by('-created_at')
    
    serializer = TravelRequestsSerializer(pending_requests, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsManager, IsAuthenticated])
def request_more_info(request, id):
    """
    Allows a manager to request additional information from an employee.
    Adds a note and sends an email notification.
    """
    try:
        travel_request = Travel_Requests.objects.get(id=id)
    except Travel_Requests.DoesNotExist:
        return Response({"error": "Travel request not found"}, status=status.HTTP_404_NOT_FOUND)

    manager = get_manager(request.user)
    if not manager:
        return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

    note_content = request.data.get("note", "").strip()
    if not note_content:
        return Response({"error": "Note content is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Create a note entry
    Notes.objects.create(
        travel_request=travel_request,
        manager=manager,
        note=note_content
    )

    # Send an email notification
    send_email_notification(
        travel_request.employee,
        "Additional Information Required",
        f"Your travel request requires more information: {note_content}"
    )

    return Response({"message": "Request for more info sent successfully"}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsManager, IsAuthenticated])
def get_travel_request(request, id):
    """
    Fetches a specific travel request for the manager.
    Ensures the request belongs to an employee assigned to this manager.
    """
    try:
        travel_request = Travel_Requests.objects.get(id=id, assigned_manager=request.user.managers)
    except Travel_Requests.DoesNotExist:
        return Response({"error": "Travel request not found or access denied."}, status=status.HTTP_404_NOT_FOUND)

    serializer = TravelRequestsSerializer(travel_request)
    return Response(serializer.data, status=status.HTTP_200_OK)
