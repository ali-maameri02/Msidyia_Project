from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', views.CategoryDetailView.as_view(), name='category-detail'),
    path('subjects/', views.SubjectListCreateView.as_view(), name='subject-list-create'),
    path('subjects/<int:pk>/', views.SubjectDetailView.as_view(), name='subject-detail'),
    path('topics/', views.TopicListCreateView.as_view(), name='topic-list-create'),
    path('topics/<int:pk>/', views.TopicDetailView.as_view(), name='topic-detail'),
    path('group-classes/', views.GroupClassListCreateView.as_view(), name='group-class-list-create'),
    path('group-classes/<int:pk>/', views.GroupClassDetailView.as_view(), name='group-class-detail'),
    path('group-class-reviews/', views.GroupClassReviewListCreateView.as_view(), name='group-class-review-list-create'),
    path('group-class-reviews/<int:pk>/', views.GroupClassReviewDetailView.as_view(), name='group-class-review-detail'),
    path('reports/', views.ReportListCreateView.as_view(), name='report-list-create'),
    path('reports/<int:pk>/', views.ReportDetailView.as_view(), name='report-detail'),
    path('schedules/', views.ScheduleListCreateView.as_view(), name='schedule-list-create'),
    path('schedules/<int:pk>/', views.ScheduleDetailView.as_view(), name='schedule-detail'),
    path('discounts/', views.DiscountListCreateView.as_view(), name='discount-list-create'),
    path('discounts/<int:pk>/', views.DiscountDetailView.as_view(), name='discount-detail'),
]
