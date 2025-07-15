-- Migration: 1752521600000_create_indexes/down.sql

-- Student Payments index'lerini sil
DROP INDEX IF EXISTS idx_student_payments_year_month;
DROP INDEX IF EXISTS idx_student_payments_paid_date;
DROP INDEX IF EXISTS idx_student_payments_due_date;
DROP INDEX IF EXISTS idx_student_payments_payment_status;
DROP INDEX IF EXISTS idx_student_payments_parent_id;
DROP INDEX IF EXISTS idx_student_payments_student_id;

-- School Payments index'lerini sil
DROP INDEX IF EXISTS idx_school_payments_year_month;
DROP INDEX IF EXISTS idx_school_payments_paid_date;
DROP INDEX IF EXISTS idx_school_payments_due_date;
DROP INDEX IF EXISTS idx_school_payments_payment_status;
DROP INDEX IF EXISTS idx_school_payments_payment_plan_id;
DROP INDEX IF EXISTS idx_school_payments_school_id;

-- Payment Plans index'lerini sil
DROP INDEX IF EXISTS idx_payment_plans_is_active;
DROP INDEX IF EXISTS idx_payment_plans_school_id;

-- Custom Notifications index'lerini sil
DROP INDEX IF EXISTS idx_custom_notifications_scheduled_for;
DROP INDEX IF EXISTS idx_custom_notifications_status;
DROP INDEX IF EXISTS idx_custom_notifications_notification_type;
DROP INDEX IF EXISTS idx_custom_notifications_created_by;
DROP INDEX IF EXISTS idx_custom_notifications_student_id;

-- Notifications index'lerini sil
DROP INDEX IF EXISTS idx_notifications_user_read;
DROP INDEX IF EXISTS idx_notifications_sent_at;
DROP INDEX IF EXISTS idx_notifications_scheduled_for;
DROP INDEX IF EXISTS idx_notifications_is_read;
DROP INDEX IF EXISTS idx_notifications_notification_type;
DROP INDEX IF EXISTS idx_notifications_user_id;

-- Messages index'lerini sil
DROP INDEX IF EXISTS idx_messages_conversation_sent;
DROP INDEX IF EXISTS idx_messages_message_type;
DROP INDEX IF EXISTS idx_messages_is_read;
DROP INDEX IF EXISTS idx_messages_sent_at;
DROP INDEX IF EXISTS idx_messages_sender_id;
DROP INDEX IF EXISTS idx_messages_conversation_id;

-- Conversation Participants index'lerini sil
DROP INDEX IF EXISTS idx_conversation_participants_joined_at;
DROP INDEX IF EXISTS idx_conversation_participants_is_active;
DROP INDEX IF EXISTS idx_conversation_participants_user_id;
DROP INDEX IF EXISTS idx_conversation_participants_conversation_id;

-- Conversations index'lerini sil
DROP INDEX IF EXISTS idx_conversations_last_message_at;
DROP INDEX IF EXISTS idx_conversations_is_active;
DROP INDEX IF EXISTS idx_conversations_conversation_type;
DROP INDEX IF EXISTS idx_conversations_class_id;
DROP INDEX IF EXISTS idx_conversations_school_id;

-- Pickup Notifications index'lerini sil
DROP INDEX IF EXISTS idx_pickup_notifications_student_status;
DROP INDEX IF EXISTS idx_pickup_notifications_scheduled_time;
DROP INDEX IF EXISTS idx_pickup_notifications_status;
DROP INDEX IF EXISTS idx_pickup_notifications_created_by;
DROP INDEX IF EXISTS idx_pickup_notifications_student_id;

-- Medication Logs index'lerini sil
DROP INDEX IF EXISTS idx_medication_logs_administered_at;
DROP INDEX IF EXISTS idx_medication_logs_administered_by;
DROP INDEX IF EXISTS idx_medication_logs_medication_id;

-- Medications index'lerini sil
DROP INDEX IF EXISTS idx_medications_student_active;
DROP INDEX IF EXISTS idx_medications_end_date;
DROP INDEX IF EXISTS idx_medications_start_date;
DROP INDEX IF EXISTS idx_medications_is_active;
DROP INDEX IF EXISTS idx_medications_prescribed_by;
DROP INDEX IF EXISTS idx_medications_student_id;

-- Daily Report Details index'lerini sil
DROP INDEX IF EXISTS idx_daily_report_details_report_item_id;
DROP INDEX IF EXISTS idx_daily_report_details_daily_report_id;

-- Daily Report Item Types index'lerini sil
DROP INDEX IF EXISTS idx_daily_report_item_types_sort_order;
DROP INDEX IF EXISTS idx_daily_report_item_types_report_item_id;

-- Daily Report Items index'lerini sil
DROP INDEX IF EXISTS idx_daily_report_items_sort_order;
DROP INDEX IF EXISTS idx_daily_report_items_is_active;
DROP INDEX IF EXISTS idx_daily_report_items_school_id;

-- Daily Reports index'lerini sil
DROP INDEX IF EXISTS idx_daily_reports_student_date;
DROP INDEX IF EXISTS idx_daily_reports_report_date;
DROP INDEX IF EXISTS idx_daily_reports_teacher_id;
DROP INDEX IF EXISTS idx_daily_reports_student_id;

-- Media Tags index'lerini sil
DROP INDEX IF EXISTS idx_media_tags_tag_name;
DROP INDEX IF EXISTS idx_media_tags_media_id;

-- Media index'lerini sil
DROP INDEX IF EXISTS idx_media_school_visibility;
DROP INDEX IF EXISTS idx_media_created_at;
DROP INDEX IF EXISTS idx_media_visibility_type;
DROP INDEX IF EXISTS idx_media_file_type;
DROP INDEX IF EXISTS idx_media_uploaded_by;
DROP INDEX IF EXISTS idx_media_student_id;
DROP INDEX IF EXISTS idx_media_class_id;
DROP INDEX IF EXISTS idx_media_school_id;

-- Weekly Schedule index'lerini sil
DROP INDEX IF EXISTS idx_weekly_schedule_class_week;
DROP INDEX IF EXISTS idx_weekly_schedule_is_active;
DROP INDEX IF EXISTS idx_weekly_schedule_day_of_week;
DROP INDEX IF EXISTS idx_weekly_schedule_week_start;
DROP INDEX IF EXISTS idx_weekly_schedule_subject_id;
DROP INDEX IF EXISTS idx_weekly_schedule_teacher_id;
DROP INDEX IF EXISTS idx_weekly_schedule_class_id;

-- Subjects index'lerini sil
DROP INDEX IF EXISTS idx_subjects_school_active;
DROP INDEX IF EXISTS idx_subjects_is_active;
DROP INDEX IF EXISTS idx_subjects_school_id;

-- Meal Calendar Items index'lerini sil
DROP INDEX IF EXISTS idx_meal_calendar_items_sort_order;
DROP INDEX IF EXISTS idx_meal_calendar_items_meal_id;
DROP INDEX IF EXISTS idx_meal_calendar_items_calendar_id;

-- Meal Calendar index'lerini sil
DROP INDEX IF EXISTS idx_meal_calendar_class_date;
DROP INDEX IF EXISTS idx_meal_calendar_meal_type;
DROP INDEX IF EXISTS idx_meal_calendar_meal_date;
DROP INDEX IF EXISTS idx_meal_calendar_class_id;

-- Meals index'lerini sil
DROP INDEX IF EXISTS idx_meals_school_active;
DROP INDEX IF EXISTS idx_meals_is_active;
DROP INDEX IF EXISTS idx_meals_school_id;

-- Student Parents index'lerini sil
DROP INDEX IF EXISTS idx_student_parents_can_pickup;
DROP INDEX IF EXISTS idx_student_parents_primary_contact;
DROP INDEX IF EXISTS idx_student_parents_parent_id;
DROP INDEX IF EXISTS idx_student_parents_student_id;

-- Students index'lerini sil
DROP INDEX IF EXISTS idx_students_class_active;
DROP INDEX IF EXISTS idx_students_enrollment_date;
DROP INDEX IF EXISTS idx_students_birth_date;
DROP INDEX IF EXISTS idx_students_is_active;
DROP INDEX IF EXISTS idx_students_school_id;
DROP INDEX IF EXISTS idx_students_class_id;

-- Classes index'lerini sil
DROP INDEX IF EXISTS idx_classes_school_active;
DROP INDEX IF EXISTS idx_classes_is_active;
DROP INDEX IF EXISTS idx_classes_secondary_teacher_id;
DROP INDEX IF EXISTS idx_classes_main_teacher_id;
DROP INDEX IF EXISTS idx_classes_school_id;

-- Users index'lerini sil
DROP INDEX IF EXISTS idx_users_last_login;
DROP INDEX IF EXISTS idx_users_school_role;
DROP INDEX IF EXISTS idx_users_is_active;
DROP INDEX IF EXISTS idx_users_role_id;
DROP INDEX IF EXISTS idx_users_school_id;
DROP INDEX IF EXISTS idx_users_email;

-- Roles index'lerini sil
DROP INDEX IF EXISTS idx_roles_name;

-- Schools index'lerini sil
DROP INDEX IF EXISTS idx_schools_created_at;
DROP INDEX IF EXISTS idx_schools_is_active;
DROP INDEX IF EXISTS idx_schools_phone;
DROP INDEX IF EXISTS idx_schools_email;