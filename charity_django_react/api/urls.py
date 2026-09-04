from django.urls import path

from .views import (
    current_user,
    health_check,
    login_user,
    logout_user,
    signup_user,
    site_data,
    submit_contact,
    submit_donation,
    update_profile,
)

urlpatterns = [
    path('health/', health_check, name='health-check'),
    path('site-data/', site_data, name='site-data'),
    path('contact/', submit_contact, name='submit-contact'),
    path('donate/', submit_donation, name='submit-donation'),
    path('auth/signup/', signup_user, name='signup-user'),
    path('auth/login/', login_user, name='login-user'),
    path('auth/logout/', logout_user, name='logout-user'),
    path('auth/me/', current_user, name='auth-me'),
    path('auth/profile/', update_profile, name='auth-profile'),
]
