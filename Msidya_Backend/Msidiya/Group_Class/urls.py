from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', views.CategoryDetailView.as_view(), name='category-detail'),
    path('subjects/', views.SubjectListCreateView.as_view(), name='subject-list-create'),
    path("categories/<int:category_id>/create_subject/", views.CreateSubjectForCategoryView.as_view(), name="create-subject-for-category"),

    path('subjects/<int:pk>/', views.SubjectDetailView.as_view(), name='subject-detail'),
    path('topics/', views.TopicListCreateView.as_view(), name='topic-list-create'),
    path("subjects/<int:subject_id>/add_topic/", views.AddTopicToSubjectView.as_view(), name="add-topic-to-subject"),

    path('topics/<int:pk>/', views.TopicDetailView.as_view(), name='topic-detail'),
     path('categories/<int:category_id>/subjects/', views.get_category_subjects, name='category-subjects'),
     path('subjects/<int:subject_id>/topics/', views.get_subject_topics, name='subject-topics'),
    path('group-classes/', views.GroupClassListCreateView.as_view(), name='group-class-list-create'),
    path('group-classes/tutor/stats/', views.group_class_completion_chart, name='group-class-tutor-stats'),

    path('group-classes/earnings/stats/', views.get_monthly_sales, name='group-class-tutor-earnings-stats'),



    path('group-classes/<int:pk>/', views.GroupClassDetailView.as_view(), name='group-class-detail'),
    path('group-class-reviews/', views.GroupClassReviewListCreateView.as_view(), name='group-class-review-list-create'),
    path('group-class-reviews/<int:pk>/', views.GroupClassReviewDetailView.as_view(), name='group-class-review-detail'),
    path('reports/', views.ReportListCreateView.as_view(), name='report-list-create'),
    path('reports/<int:pk>/', views.ReportDetailView.as_view(), name='report-detail'),
    
    path('discounts/', views.DiscountListCreateView.as_view(), name='discount-list-create'),
    path('discounts/<int:pk>/', views.DiscountDetailView.as_view(), name='discount-detail'),
        path('student-appointments/', views.StudentAppointmentListView.as_view(), name='student-appointment-list'),
    path('book-schedule/', views.BookScheduleView.as_view(), name='book-schedule'),
    path('available-schedules/', views.AvailableSchedulesView.as_view(), name='available-schedules'),

    path('schedulescreate/', views.ScheduleListCreateView.as_view(), name='schedule-create'),
    path('schedules/', views.ScheduleListView.as_view(), name='schedule-create'),
    path('schedules/<int:pk>/', views.ScheduleDetailView.as_view(), name='schedule-detail'),

]
