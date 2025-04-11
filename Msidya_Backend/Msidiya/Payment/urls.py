from django.urls import path

from . import views
from .views import InitiatePaymentView


urlpatterns = [
    # Currency URLs
    path('currencies/', views.CurrencyListCreateView.as_view(), name='currency-list-create'),
    path('currencies/<int:pk>/', views.CurrencyRetrieveUpdateDestroyView.as_view(), name='currency-detail'),

    # PaymentAccount URLs
    path('payment-accounts/', views.PaymentAccountListCreateView.as_view(), name='paymentaccount-list-create'),
    path('payment-accounts/<int:pk>/', views.PaymentAccountRetrieveUpdateDestroyView.as_view(), name='paymentaccount-detail'),
    # path("webhook/", views.WebhookView.as_view(), name="webhook"),
    path('group-classes/<int:class_id>/initiate-payment/', InitiatePaymentView.as_view(), name='initiate-payment'),
    path('student-payments/<int:student_id>/', views.StudentPaymentView.as_view(), name='student-payments'),

    # Payout URLs
    path('payouts/', views.PayoutListCreateView.as_view(), name='payout-list-create'),
    path('payouts/<int:pk>/', views.PayoutRetrieveUpdateDestroyView.as_view(), name='payout-detail'),
]
