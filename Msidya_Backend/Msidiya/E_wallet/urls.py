from django.urls import path
from .views import WalletViewSet, PaymentViewSet, TransactionViewSet, Chargily_webhook, initiate_payment, enroll_class, transfer_coins, request_refund,group_class_transactions,group_class_transactions_stats

urlpatterns = [
    # Wallet URLs (ReadOnly)
    path('wallet/', WalletViewSet.as_view({'get': 'list'}), name='wallet-list'),
    path('wallet/<int:pk>/', WalletViewSet.as_view({'get': 'retrieve'}), name='wallet-detail'),

    # Payment URLs (list, create, retrieve, update)
    path('payments/', PaymentViewSet.as_view({'get': 'list', 'post': 'create'}), name='payment-list'),
    path('payments/<int:pk>/', PaymentViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
    }), name='payment-detail'),

    # Transaction URLs (ReadOnly)
    path('transactions/', TransactionViewSet.as_view({'get': 'list'}), name='transaction-list'),
    path('transactions/<int:pk>/', TransactionViewSet.as_view({'get': 'retrieve'}), name='transaction-detail'),
    path('transactions/enroll_class/', enroll_class, name='enroll_class'),
    path('transactions/transfer_coins/', transfer_coins, name='transfer_coins'),
    path('transactions/request_refund/', request_refund, name='request_refund'),
    path('group-class-transactions/', group_class_transactions, name='group_class_transactions'),
    path('group-class-transactions/stats/', group_class_transactions_stats, name='group_class_transactions_stats'),

    # Chargily URLs Webhook
    path('webhook', Chargily_webhook, name='chargily_webhook'),
    path('checkout', initiate_payment, name='chargily_gateway'),
]
