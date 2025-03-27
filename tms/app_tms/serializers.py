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
        if obj.login_auth:  
            return f"{obj.login_auth.first_name} {obj.login_auth.last_name}".strip()
        return None
        
    def get_manager_email(self, obj):
        '''
         get manager email from login table
         '''
        if obj.login_auth:
            return obj.login_auth.email
        return None
        
    def get_manager_username(self, obj):
        '''
         get manager username from login table
         '''
        if obj.login_auth:
            return obj.login_auth.username
        return None

class ManagerAssignmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Manager_Assignments
        fields='__all__'







class TravelRequestsSerializer(serializers.ModelSerializer):
    manager_name = serializers.SerializerMethodField()
    employee_name = serializers.SerializerMethodField()
    new_notes_count = serializers.SerializerMethodField()

    class Meta:
        model = Travel_Requests
        fields = "__all__"
        read_only_fields = ("created_at",)
    
    def validate(self, data):
        """Validate lodging requirements"""
        lodging_required = data.get('lodging_required')
        lodging_location = data.get('lodging_location', '')
        
        # Validate lodging requirements
        if lodging_required == 0 and lodging_location and lodging_location.strip():
            raise serializers.ValidationError({
                "lodging_location": "Lodging location must be empty when lodging is not required."
            })
        
        if lodging_required == 1 and (not lodging_location or not lodging_location.strip()):
            raise serializers.ValidationError({
                "lodging_location": "Lodging location is required when lodging is needed."
            })
            
        return data

    def to_internal_value(self, data):
        """Pre-process incoming data"""
        # Handle lodging_location for consistency
        lodging_required = data.get('lodging_required')
        if lodging_required == 0 or lodging_required == '0':
            data['lodging_location'] = None
        
        # Validate the request status against available choices
        request_status = data.get('request_status')
        if request_status:
            valid_choices = [choice[0] for choice in Travel_Requests.RequestStatusIndex.choices]
            if request_status not in valid_choices:
                raise serializers.ValidationError({
                    'request_status': f"'{request_status}' is not a valid choice. Valid choices are: {valid_choices}"
                })
        
        # Let DRF handle the rest normally
        return super().to_internal_value(data)

    # Rest of your methods remain the same
    def get_manager_name(self, obj):
        """
        Get manager name by looking up Manager_Assignments for the employee
        """
        if obj.employee:
            # Try to find manager assignment for this employee
            try:
                # Look up manager from Manager_Assignments
                assignment = Manager_Assignments.objects.filter(employee=obj.employee).first()
                if assignment and assignment.manager and assignment.manager.login_auth:
                    return f"{assignment.manager.login_auth.first_name} {assignment.manager.login_auth.last_name}".strip()
            except Manager_Assignments.DoesNotExist:
                pass
                
        # Fallback to directly referenced manager (if any)
        if hasattr(obj, 'manager') and obj.manager and obj.manager.login_auth:  
            return f"{obj.manager.login_auth.first_name} {obj.manager.login_auth.last_name}".strip()
            
        return None

    def get_employee_name(self, obj):
        if obj.employee and obj.employee.login_auth:  
            return f"{obj.employee.login_auth.first_name} {obj.employee.login_auth.last_name}".strip()
        return None 

    def get_new_notes_count(self, obj):
        return Notes.objects.filter(request=obj, read_status="NE").count()



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

