from django.urls import path
from .views import handle_travel_request,read_notes

urlpatterns = [
    path("travel-request/", handle_travel_request, name="travel_request_list"),
    path("travel-request/<int:id>/", handle_travel_request, name="travel_request_details_id_specific"),
    path("travel-request/notes/<int:id>/", read_notes, name="travel_request_notes_id_specific")
]
