from django.urls import path
from . import views

urlpatterns = [
    # Currency URLs
    path('currencies/', views.CurrencyListCreateView.as_view(), name='currency-list-create'),
    path('currencies/<int:pk>/', views.CurrencyRetrieveUpdateDestroyView.as_view(), name='currency-detail'),

    # PaymentAccount URLs
    path('payment-accounts/', views.PaymentAccountListCreateView.as_view(), name='paymentaccount-list-create'),
    path('payment-accounts/<int:pk>/', views.PaymentAccountRetrieveUpdateDestroyView.as_view(), name='paymentaccount-detail'),

    # Payout URLs
    path('payouts/', views.PayoutListCreateView.as_view(), name='payout-list-create'),
    path('payouts/<int:pk>/', views.PayoutRetrieveUpdateDestroyView.as_view(), name='payout-detail'),
]
