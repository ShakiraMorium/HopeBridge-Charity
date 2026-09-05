from django.urls import path

from .views import (
    current_user,
    forgot_password,
    health_check,
    login_user,
    logout_user,
    reset_password,
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
    path('auth/forgot-password/', forgot_password, name='forgot-password'),
    path('auth/reset-password/<uidb64>/<token>/', reset_password, name='reset-password'),
    path('auth/logout/', logout_user, name='logout-user'),
    path('auth/me/', current_user, name='auth-me'),
    path('auth/profile/', update_profile, name='auth-profile'),
]
