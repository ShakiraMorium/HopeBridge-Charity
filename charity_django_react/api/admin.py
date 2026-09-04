from django.contrib import admin

from .models import ContactMessage, Donation


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    list_filter = ('created_at',)


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('donor_name', 'donor_email', 'amount', 'cause', 'donation_date', 'created_at')
    search_fields = ('donor_name', 'donor_email', 'address', 'cause')
    list_filter = ('donation_date', 'cause', 'created_at')
