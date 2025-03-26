from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Travel_Requests, Employees, Managers, Admins, Notes
from .serializers import (EmployeeSerializer,ManagerAssignmentsSerializer,ManagerSerializer
                          ,AdminSerializer,NotesSerializer,TravelRequestsSerializer,UserSerializer)
from .permissions import IsEmployee, IsManager, IsAdmin
from .utils import (
    get_employee, get_manager, get_admin, get_travel_requests_for_user,
    can_edit_request, can_cancel_request, can_approve_or_reject,
    can_request_more_info, can_close_request, assign_manager_to_request,
    send_email_notification,create_user,get_user_role
)
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes

# ---------------- Authentication ----------------


# @csrf_exempt
@api_view(['POST'])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    
    if user:
        #fetch use role
        role=get_user_role(user)
        # Generate or get existing token
        token, created = Token.objects.get_or_create(user=user)
        return Response({"message": "Login successful.", "token": token.key,"user_role":role}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
