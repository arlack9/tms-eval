from rest_framework import serializers
from django.utils.timezone import now
from .models import Employees,Managers,Admins,Manager_Assignments,Notes,Travel_Requests

#default auth_user table
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField()
    employee_email = serializers.SerializerMethodField()
    employee_username = serializers.SerializerMethodField()

    def create(self, validated_data):
        validated_data["created_at"] = now().date()
        return super().create(validated_data)
        
    class Meta:
        model = Employees
        fields = '__all__'
        
    def get_employee_name(self, obj):
        '''
         get employee full name from login table 
         '''
        if obj.login_auth:  
            return f"{obj.login_auth.first_name} {obj.login_auth.last_name}".strip()
        return None
        
    def get_employee_email(self, obj):
        '''
         get employee email from login table
         '''
        if obj.login_auth:
            return obj.login_auth.email
        return None
        
    def get_employee_username(self, obj):
        '''
         get employee username from login table
         '''
        if obj.login_auth:
            return obj.login_auth.username
        return None
      

class AdminSerializer(serializers.ModelSerializer):
    def validate_login_auth(self, value):
        if not isinstance(value, User):
            print(f" Invalid login_auth detected in serializer: {value} (Type: {type(value)})")
        return value
    class Meta:
        model=Admins
        fields='__all__'


class ManagerSerializer(serializers.ModelSerializer):
    manager_name = serializers.SerializerMethodField()
    
    class Meta:
        model=Managers
        fields='__all__'
    
    def get_manager_name(self, obj):
        '''
         get manager full name from login table 
         '''
        if obj.manager and obj.manager.login_auth:  
            return f"{obj.manager.login_auth.first_name} {obj.manager.login_auth.last_name}".strip()
        return None 

class ManagerAssignmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Manager_Assignments
        fields='__all__'







class TravelRequestsSerializer(serializers.ModelSerializer):
    manager_name = serializers.SerializerMethodField()
    employee_name = serializers.SerializerMethodField()
    new_notes_count = serializers.SerializerMethodField()  # Count only new notes

    class Meta:
        model = Travel_Requests
        fields = "__all__"
        read_only_fields = ("created_at",)

    def get_manager_name(self, obj):
        '''
         get manager full name from login table 
         '''
        if obj.manager and obj.manager.login_auth:  
            return f"{obj.manager.login_auth.first_name} {obj.manager.login_auth.last_name}".strip()
        return None 

    def get_employee_name(self, obj):
        '''
         get employee full name from login table 
         '''
        if obj.employee and obj.employee.login_auth:  
            return f"{obj.employee.login_auth.first_name} {obj.employee.login_auth.last_name}".strip()
        return None 

    def get_new_notes_count(self, obj):
        '''
         get notes count from refering request id in notes table.
         '''
        return Notes.objects.filter(request=obj, read_status="NE").count()  # Count only NEW notes



class NotesSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_role = serializers.SerializerMethodField()

    def create(self, validated_data):
        validated_data["created_at"] = now().date()
        return super().create(validated_data)

    class Meta:
        model = Notes
        fields = "__all__"
        read_only_fields = ("created_at",)
        extra_fields = ["author_name", "author_role"]

    def get_author_name(self, obj):
        """
        Get the full name of the note author (Admin or Manager).
        """
        if obj.admin:
            return f"{obj.admin.login_auth.first_name} {obj.admin.login_auth.last_name}"
        elif obj.manager:
            return f"{obj.manager.login_auth.first_name} {obj.manager.login_auth.last_name}"
        return "Unknown"

    def get_author_role(self, obj):
        """
        Get the role of the author (Admin or Manager).
        """
        if obj.admin:
            return "Admin"
        elif obj.manager:
            return "Manager"
        return "Unknown"




class TravelRequestsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel_Requests
        fields = '__all__'
        read_only_fields = ['manager', 'employee']  # Prevent updates

