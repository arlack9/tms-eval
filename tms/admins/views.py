from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from app_tms.models import Travel_Requests, Employees, Managers, Notes
from app_tms.serializers import (
    EmployeeSerializer, ManagerSerializer, TravelRequestsSerializer,NotesSerializer
)
from app_tms.permissions import IsAdmin
from app_tms.utils import create_user, send_email_notification, get_admin
from rest_framework.permissions import IsAuthenticated
import json
#-------------function url handler--------------

# @api_view(['POST', 'GET', 'PUT', 'DELETE', 'PATCH'])
@permission_classes([IsAdmin, IsAuthenticated])
def handle_admin_requests(request, id=None):
    """
    Function to handle various admin actions related to travel requests.
    """

    # Travel Request Actions
    if request.method == 'GET' and id:
        return get_travel_request_of_employee(request, id)
    elif request.method == 'GET':
        return list_all_requests(request)
    elif request.method == 'PATCH' and id:
        return close_travel_request(request, id)

    return Response({"error": "Invalid request."}, status=status.HTTP_400_BAD_REQUEST)


def handle_user_requests(request,id=None):
    """
    handle various admin user 
    """
    # view
    if request.method == 'GET' and request.GET.get("type") == "employees":
        return list_employees(request)
    elif request.method == 'GET' and request.GET.get("type") == "managers":
        return list_managers(request)
    # add
    elif request.method == 'POST' and request.GET.get("type") == "employees":
        return add_employee(request)
    elif request.method == 'POST' and request.GET.get("type") == "managers":
        return add_manager(request)
    # update
    elif request.method == 'PUT' and request.GET.get("type")=="employees" and id:
        return update_user(request,id)
    
    elif request.method == 'PUT' and request.GET.get("type")=="managers" and id:
        return update_user(request,id)
    
    return Response({"error": "Invalid request."}, status=status.HTTP_400_BAD_REQUEST)


# ---------------- Admin Actions ----------------

@api_view(['PATCH'])
@permission_classes([IsAdmin, IsAuthenticated])
def close_travel_request(request, id):
    """
    Close travel request
    """
    travel_request = get_object_or_404(Travel_Requests, id=id)
    travel_request.alive_status = Travel_Requests.AliveStatusIndex.CLOSED
    travel_request.save()
    return Response({"message": "Request closed."}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAdmin, IsAuthenticated])
def list_all_requests(request):
    """
    List all requests
    """
    requests = Travel_Requests.objects.all()
    serializer = TravelRequestsSerializer(requests, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAdmin, IsAuthenticated])
def list_employees(request):
    """
    List all employees
    """
    employees = Employees.objects.all()
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAdmin, IsAuthenticated])
def list_managers(request):
    """
    List all managers
    """
    managers = Managers.objects.all()
    serializer = ManagerSerializer(managers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAdmin, IsAuthenticated])
def add_employee(request):
    """
    Add a new employee
    """
    data = request.data.copy()
    response = create_user(
        data.pop("email"), data.pop("first_name"), data.pop("last_name"), "employee", data
    )
    return Response(response, status=status.HTTP_201_CREATED if response["success"] else status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAdmin, IsAuthenticated])
def add_manager(request):
    """
    Add a new manager
    """
    data = request.data.copy()
    response = create_user(
        data.pop("email"), data.pop("first_name"), data.pop("last_name"), "manager", data
    )
    return Response(response, status=status.HTTP_201_CREATED if response["success"] else status.HTTP_400_BAD_REQUEST)




@api_view(["POST"])
@permission_classes([IsAdmin, IsAuthenticated])
def send_request_note(request, id):
    """
    Admin can send a request note based on the travel request ID.
    """
    travel_request = get_object_or_404(Travel_Requests, id=id)
    admin = get_admin(request.user)  # Ensure this function retrieves the correct Admin instance

    if not admin:
        return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

    request_data = request.data.copy()  # Copy to modify data safely
    request_data["request"] = travel_request.id  # Ensure correct request ID is passed
    request_data["admin"] = admin.id  # Assign admin ID
    request_data["note_by"] = "ADMIN"  # Set the creator role
    request_data["read_status"] = Notes.ReadStatusIndex.NEW  # Default to NEW

    serializer = NotesSerializer(data=request_data)
    if serializer.is_valid():
        serializer.save()

        # Send email notification
        send_email_notification(
            travel_request.employee,
            "Admin Note Added",
            f"A note has been added to your travel request: {serializer.validated_data['note_text']}"
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_travel_request_of_employee(request, id):
    """
    Admin function to fetch all travel requests of a specific employee.
    """
    try:
        employee = Employees.objects.get(id=id)
        travel_requests = Travel_Requests.objects.filter(employee=employee)

        if not travel_requests.exists():
            return Response({"message": "No travel requests found for this employee."}, status=status.HTTP_404_NOT_FOUND)

        serializer = TravelRequestsSerializer(travel_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Employees.DoesNotExist:
        return Response({"error": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

