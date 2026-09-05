import json
from datetime import datetime
from decimal import Decimal, InvalidOperation

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import JsonResponse
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.views.decorators.csrf import csrf_exempt

from .models import ContactMessage, Donation, UserProfile

SITE_DATA = {
    'brand': 'HopeBridge',
    'navigation': [
        {'label': 'Home', 'href': '/'},
        {'label': 'Causes', 'href': '/causes'},
        {'label': 'Events', 'href': '/events'},
        {'label': 'Blog', 'href': '/blog'},
        {'label': 'Contact', 'href': '/contact'},
    ],
    'hero': {
        'title': 'Making A Difference Through Our Causes',
        'subtitle': 'Together we can restore hope, protect children, and build healthier communities across the region.',
        'primaryButton': 'Donate Now',
        'secondaryButton': 'Learn More',
        'stats': [
            {'label': 'People Helped', 'value': '24K+'},
            {'label': 'Volunteer Hours', 'value': '8.2K'},
            {'label': 'Active Donors', 'value': '1.4K'},
        ],
    },
    'impact': [
        {'icon': 'Leaf', 'title': 'Clean Water & Sanitation', 'description': 'Borewells, filters, and hygiene education for villages facing severe water scarcity.'},
        {'icon': 'Heart', 'title': 'Children & Education', 'description': 'School meals, scholarships, and classroom resources for children in need.'},
        {'icon': 'Users', 'title': 'Community Support', 'description': 'Disaster relief, food drives, and mobile health clinics for vulnerable families.'},
    ],
    'causes': [
        {
            'id': 'clean-water',
            'title': 'Providing Clean Water To Remote Villages',
            'category': 'Water Access',
            'image': '/images/clean-water-bottle.jpg',
            'raised': 16500,
            'goal': 22000,
            'supporters': 412,
            'summary': 'Install water purification systems and safe storage tanks to bring clean drinking water to rural families.',
        },
        {
            'id': 'food-security',
            'title': 'Fighting Hunger With Nutritious Meals',
            'category': 'Food Relief',
            'image': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80',
            'raised': 20800,
            'goal': 30000,
            'supporters': 535,
            'summary': 'Deliver weekly meal packs and school nutrition support to children and families in crisis.',
        },
        {
            'id': 'education',
            'title': 'Empowering Children Through Education',
            'category': 'Education',
            'image': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
            'raised': 19100,
            'goal': 26000,
            'supporters': 621,
            'summary': 'Fund school kits, teacher training, and safe learning spaces for underserved communities.',
        },
        {
            'id': 'healthcare',
            'title': 'Improving Health Access In Rural Areas',
            'category': 'Healthcare',
            'image': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
            'raised': 13700,
            'goal': 18000,
            'supporters': 298,
            'summary': 'Support mobile health clinics, maternal care, and preventative treatment programs.',
        },
    ],
    'events': [
        {
            'id': 'community-garden',
            'title': 'Community Garden Day',
            'location': 'Dhaka, Bangladesh',
            'date': 'May 18, 2026',
            'time': '9:00 AM',
            'image': 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80',
            'description': 'Join families in a day of planting, learning, and sharing fresh food with local neighborhoods.',
        },
        {
            'id': 'health-camp',
            'title': 'Mobile Health Camp',
            'location': 'Khulna, Bangladesh',
            'date': 'Jun 07, 2026',
            'time': '8:30 AM',
            'image': 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
            'description': 'Free checkups, vaccination support, and health counseling for mothers and children.',
        },
    ],
    'articles': [
        {
            'id': 'empowering-stories',
            'title': 'Empowering Lives Stories Of Hope And Change',
            'category': 'Latest Articles',
            'image': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
            'excerpt': 'A look into the stories of families whose lives changed through clean water projects and community investment.',
            'date': 'April 18, 2026',
        },
        {
            'id': 'school-journey',
            'title': 'How Education Creates Better Futures',
            'category': 'Education',
            'image': 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
            'excerpt': 'Scholarships and tutoring continue to open meaningful opportunities for young learners.',
            'date': 'March 22, 2026',
        },
        {
            'id': 'rural-healthcare',
            'title': 'Rural Healthcare Access And Community Care',
            'category': 'Healthcare',
            'image': 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80',
            'excerpt': 'Local health workers and mobile clinics are helping families receive urgent and preventive care.',
            'date': 'February 10, 2026',
        },
    ],
    'testimonials': [
        {
            'name': 'Nadia Rahman',
            'role': 'Volunteer',
            'image': 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=900&q=80',
            'quote': 'Seeing children receive clean water and safe learning spaces has changed my perspective on what real impact can look like.',
        },
        {
            'name': 'Imran Ali',
            'role': 'Volunteer',
            'image': 'images/volunteers/imran-ali.jpg',
            'quote': 'The transparency and trust from this team make every contribution feel personal and genuinely transformative.',
        },
    ],
    'faq': [
        {
            'question': 'How can I donate to a specific cause?',
            'answer': 'Choose a project from the causes section and donate directly through the secure checkout form.',
        },
        {
            'question': 'Can I volunteer my time?',
            'answer': 'Yes. We welcome volunteers for community events, field work, teaching, and digital support.',
        },
        {
            'question': 'Do you work with local organizations?',
            'answer': 'We partner with local leaders and grassroots groups to ensure programs are community-led and sustainable.',
        },
    ],
    'contact': {
        'phone': '+8801681388150',
        'email': 'hello@hopebridge.org',
        'address': 'Dhaka, Bangladesh',
        'hours': 'Mon - Sat: 9:00 AM - 6:00 PM',
    },
}


def health_check(request):
    return JsonResponse({'status': 'ok'})


def _read_json(request):
    if not request.body:
        return {}
    try:
        return json.loads(request.body.decode('utf-8'))
    except (TypeError, ValueError):
        return {}


def _serialize_user(request, user):
    profile = getattr(user, 'profile', None)
    avatar_url = None
    if profile and profile.avatar:
        avatar_url = request.build_absolute_uri(profile.avatar.url)

    return {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'full_name': f'{user.first_name} {user.last_name}'.strip() or user.username,
        'avatar': avatar_url,
        'is_authenticated': True,
    }


def site_data(request):
    return JsonResponse(SITE_DATA)


def _send_email(subject, body, recipient_list):
    from django.conf import settings

    send_mail(
        subject=subject,
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=recipient_list,
        fail_silently=False,
    )


@csrf_exempt
def signup_user(request):
    if request.method not in {'POST'}:
        return JsonResponse({'success': False, 'message': 'Only POST requests are allowed.'}, status=405)

    if request.content_type and 'multipart/form-data' in request.content_type:
        payload = request.POST
        avatar = request.FILES.get('avatar')
    else:
        payload = _read_json(request)
        avatar = None

    first_name = (payload.get('first_name') or '').strip()
    last_name = (payload.get('last_name') or '').strip()
    email = (payload.get('email') or '').strip()
    password = (payload.get('password') or '').strip()
    confirm_password = (payload.get('confirm_password') or '').strip()

    if not first_name or not email or not password:
        return JsonResponse({'success': False, 'message': 'Please provide your first name, email, and password.'}, status=400)

    if password != confirm_password:
        return JsonResponse({'success': False, 'message': 'Passwords do not match.'}, status=400)

    if User.objects.filter(email__iexact=email).exists():
        return JsonResponse({'success': False, 'message': 'An account with this email already exists.'}, status=400)

    username = (payload.get('username') or email).strip() or email
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
    )

    profile, _ = UserProfile.objects.get_or_create(user=user)
    if avatar:
        profile.avatar = avatar
        profile.save()

    login(request, user)
    return JsonResponse({'success': True, 'message': 'Account created successfully.', 'user': _serialize_user(request, user)})


@csrf_exempt
def login_user(request):
    if request.method not in {'POST'}:
        return JsonResponse({'success': False, 'message': 'Only POST requests are allowed.'}, status=405)

    payload = _read_json(request)
    email = (payload.get('email') or '').strip()
    password = (payload.get('password') or '').strip()

    if not email or not password:
        return JsonResponse({'success': False, 'message': 'Please enter your email and password.'}, status=400)

    user = User.objects.filter(email__iexact=email).first()
    if not user:
        return JsonResponse({'success': False, 'message': 'Account not found. Please sign up first.'}, status=404)

    authenticated = authenticate(request, username=user.username, password=password)
    if not authenticated:
        return JsonResponse({'success': False, 'message': 'Incorrect password. Please try again.'}, status=401)

    login(request, authenticated)
    return JsonResponse({'success': True, 'message': 'Login successful.', 'user': _serialize_user(request, authenticated)})


@csrf_exempt
def forgot_password(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST requests are allowed.'}, status=405)

    payload = _read_json(request)
    email = (payload.get('email') or '').strip()
    if not email:
        return JsonResponse({'success': False, 'message': 'Please enter your email address.'}, status=400)

    user = User.objects.filter(email__iexact=email, is_active=True).first()
    if user:
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        from django.conf import settings
        frontend_url = getattr(settings, 'FRONTEND_URL', 'http://127.0.0.1:5173')
        reset_url = f'{frontend_url.rstrip("/")}/reset-password/{uid}/{token}'
        _send_email(
            subject='Reset your HopeBridge password',
            body=(
                f'Hello {user.first_name or user.username},\n\n'
                f'Use this link to reset your HopeBridge password:\n{reset_url}\n\n'
                'This link expires when your password changes. If you did not request this, you can ignore this email.'
            ),
            recipient_list=[user.email],
        )

    return JsonResponse({'success': True, 'message': 'If an account exists for that email, a reset link has been sent.'})


@csrf_exempt
def reset_password(request, uidb64, token):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST requests are allowed.'}, status=405)

    payload = _read_json(request)
    password = (payload.get('password') or '').strip()
    confirm_password = (payload.get('confirm_password') or '').strip()
    if len(password) < 8:
        return JsonResponse({'success': False, 'message': 'Password must be at least 8 characters.'}, status=400)
    if password != confirm_password:
        return JsonResponse({'success': False, 'message': 'Passwords do not match.'}, status=400)

    try:
        user_id = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=user_id, is_active=True)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if not user or not default_token_generator.check_token(user, token):
        return JsonResponse({'success': False, 'message': 'This password reset link is invalid or expired.'}, status=400)

    user.set_password(password)
    user.save(update_fields=['password'])
    return JsonResponse({'success': True, 'message': 'Your password has been reset. You can now log in.'})


@csrf_exempt
def logout_user(request):
    logout(request)
    return JsonResponse({'success': True, 'message': 'Logged out successfully.'})


@csrf_exempt
def current_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({'authenticated': False})
    return JsonResponse({'authenticated': True, 'user': _serialize_user(request, request.user)})


@csrf_exempt
def update_profile(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success': False, 'message': 'Please log in to update your profile.'}, status=401)

    if request.method == 'GET':
        return JsonResponse({'success': True, 'user': _serialize_user(request, request.user)})

    if request.content_type and 'multipart/form-data' in request.content_type:
        payload = request.POST
        avatar = request.FILES.get('avatar')
    else:
        payload = _read_json(request)
        avatar = None

    first_name = (payload.get('first_name') or '').strip() or request.user.first_name
    last_name = (payload.get('last_name') or '').strip() or request.user.last_name
    bio = (payload.get('bio') or '').strip()

    request.user.first_name = first_name
    request.user.last_name = last_name
    request.user.save()

    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    if avatar:
        profile.avatar = avatar
    if bio:
        profile.bio = bio
    profile.save()

    return JsonResponse({'success': True, 'message': 'Profile updated.', 'user': _serialize_user(request, request.user)})


@csrf_exempt
def submit_contact(request):
    payload = _read_json(request)
    name = (payload.get('name') or '').strip()
    email = (payload.get('email') or '').strip()
    subject = (payload.get('subject') or 'New contact message').strip()
    message = (payload.get('message') or '').strip()

    if not name or not email or not message:
        return JsonResponse({'success': False, 'message': 'Please provide your name, email, and message.'}, status=400)

    try:
        ContactMessage.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message,
        )

        email_text = (
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Subject: {subject}\n\n"
            f"Message:\n{message}"
        )
        try:
            _send_email(
                subject=f'New contact form message from {name}',
                body=email_text,
                recipient_list=['hello@hopebridge.org'],
            )
        except Exception:
            return JsonResponse({'success': True, 'message': 'Thanks for contacting HopeBridge. Your message has been saved and is ready for email delivery when SMTP is configured.'})
    except Exception:
        return JsonResponse({'success': False, 'message': 'Something went wrong while saving your message. Please try again.'}, status=500)

    return JsonResponse({'success': True, 'message': 'Thanks for contacting HopeBridge. We will respond soon.'})


@csrf_exempt
def submit_donation(request):
    payload = _read_json(request)
    name = (payload.get('name') or '').strip()
    email = (payload.get('email') or '').strip()
    address = (payload.get('address') or '').strip()
    donation_date_raw = (payload.get('date') or '').strip()
    amount_raw = (payload.get('amount') or '').strip()
    cause = (payload.get('cause') or 'General support').strip()

    if not name or not email or not address or not donation_date_raw or not amount_raw:
        return JsonResponse({'success': False, 'message': 'Please enter your full name, address, donation date, and amount.'}, status=400)

    try:
        donation_date = datetime.fromisoformat(donation_date_raw).date()
    except ValueError:
        try:
            donation_date = datetime.strptime(donation_date_raw, '%m/%d/%Y').date()
        except ValueError:
            return JsonResponse({'success': False, 'message': 'Please provide a valid donation date.'}, status=400)

    try:
        amount = Decimal(amount_raw)
    except InvalidOperation:
        return JsonResponse({'success': False, 'message': 'Please provide a valid donation amount.'}, status=400)

    try:
        donation = Donation.objects.create(
            donor_name=name,
            donor_email=email,
            address=address,
            donation_date=donation_date,
            amount=amount,
            cause=cause,
        )

        email_text = (
            'Donation Success Confirmation\n\n'
            f"Donor Name: {name}\n"
            f"Address: {address}\n"
            f"Donation Date: {donation_date.isoformat()}\n"
            f"Donation Amount: ${amount:.2f}\n"
            f"Cause: {cause}\n\n"
            'Thank you for continuing this donation programme. Your generosity helps us bring clean water, food, education, '
            'and hope to families who need it most. We are deeply grateful for your support and for standing with our mission.'
        )
        _send_email(
            subject=f'Donation receipt for {name}',
            body=email_text,
            recipient_list=[email, 'hello@hopebridge.org'],
        )
    except Exception:
        return JsonResponse({'success': False, 'message': 'Something went wrong while processing your donation. Please try again.'}, status=500)

    return JsonResponse({
        'success': True,
        'message': 'Thank you for your donation. A confirmation email has been sent.',
        'donationId': donation.id,
    })
