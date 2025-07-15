-- Migration: 1752521600000_create_indexes/up.sql

-- Schools tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_schools_email ON public.schools(email);
CREATE INDEX IF NOT EXISTS idx_schools_phone ON public.schools(phone);
CREATE INDEX IF NOT EXISTS idx_schools_is_active ON public.schools(is_active);
CREATE INDEX IF NOT EXISTS idx_schools_created_at ON public.schools(created_at);

-- Roles tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_roles_name ON public.roles(name);

-- Users tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_school_id ON public.users(school_id);
CREATE INDEX IF NOT EXISTS idx_users_role_id ON public.users(role_id);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_school_role ON public.users(school_id, role_id);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON public.users(last_login);

-- Classes tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_classes_school_id ON public.classes(school_id);
CREATE INDEX IF NOT EXISTS idx_classes_main_teacher_id ON public.classes(main_teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_secondary_teacher_id ON public.classes(secondary_teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_is_active ON public.classes(is_active);
CREATE INDEX IF NOT EXISTS idx_classes_school_active ON public.classes(school_id, is_active);

-- Students tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_students_class_id ON public.students(class_id);
CREATE INDEX IF NOT EXISTS idx_students_school_id ON public.students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_is_active ON public.students(is_active);
CREATE INDEX IF NOT EXISTS idx_students_birth_date ON public.students(birth_date);
CREATE INDEX IF NOT EXISTS idx_students_enrollment_date ON public.students(enrollment_date);
CREATE INDEX IF NOT EXISTS idx_students_class_active ON public.students(class_id, is_active);

-- Student Parents tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_student_parents_student_id ON public.student_parents(student_id);
CREATE INDEX IF NOT EXISTS idx_student_parents_parent_id ON public.student_parents(parent_id);
CREATE INDEX IF NOT EXISTS idx_student_parents_primary_contact ON public.student_parents(is_primary_contact);
CREATE INDEX IF NOT EXISTS idx_student_parents_can_pickup ON public.student_parents(can_pickup);

-- Meals tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_meals_school_id ON public.meals(school_id);
CREATE INDEX IF NOT EXISTS idx_meals_is_active ON public.meals(is_active);
CREATE INDEX IF NOT EXISTS idx_meals_school_active ON public.meals(school_id, is_active);

-- Meal Calendar tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_meal_calendar_class_id ON public.meal_calendar(class_id);
CREATE INDEX IF NOT EXISTS idx_meal_calendar_meal_date ON public.meal_calendar(meal_date);
CREATE INDEX IF NOT EXISTS idx_meal_calendar_meal_type ON public.meal_calendar(meal_type);
CREATE INDEX IF NOT EXISTS idx_meal_calendar_class_date ON public.meal_calendar(class_id, meal_date);

-- Meal Calendar Items tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_meal_calendar_items_calendar_id ON public.meal_calendar_items(meal_calendar_id);
CREATE INDEX IF NOT EXISTS idx_meal_calendar_items_meal_id ON public.meal_calendar_items(meal_id);
CREATE INDEX IF NOT EXISTS idx_meal_calendar_items_sort_order ON public.meal_calendar_items(sort_order);

-- Subjects tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_subjects_school_id ON public.subjects(school_id);
CREATE INDEX IF NOT EXISTS idx_subjects_is_active ON public.subjects(is_active);
CREATE INDEX IF NOT EXISTS idx_subjects_school_active ON public.subjects(school_id, is_active);

-- Weekly Schedule tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_weekly_schedule_class_id ON public.weekly_schedule(class_id);
CREATE INDEX IF NOT EXISTS idx_weekly_schedule_teacher_id ON public.weekly_schedule(teacher_id);
CREATE INDEX IF NOT EXISTS idx_weekly_schedule_subject_id ON public.weekly_schedule(subject_id);
CREATE INDEX IF NOT EXISTS idx_weekly_schedule_week_start ON public.weekly_schedule(week_start_date);
CREATE INDEX IF NOT EXISTS idx_weekly_schedule_day_of_week ON public.weekly_schedule(day_of_week);
CREATE INDEX IF NOT EXISTS idx_weekly_schedule_is_active ON public.weekly_schedule(is_active);
CREATE INDEX IF NOT EXISTS idx_weekly_schedule_class_week ON public.weekly_schedule(class_id, week_start_date);

-- Media tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_media_school_id ON public.media(school_id);
CREATE INDEX IF NOT EXISTS idx_media_class_id ON public.media(class_id);
CREATE INDEX IF NOT EXISTS idx_media_student_id ON public.media(student_id);
CREATE INDEX IF NOT EXISTS idx_media_uploaded_by ON public.media(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_file_type ON public.media(file_type);
CREATE INDEX IF NOT EXISTS idx_media_visibility_type ON public.media(visibility_type);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON public.media(created_at);
CREATE INDEX IF NOT EXISTS idx_media_school_visibility ON public.media(school_id, visibility_type);

-- Media Tags tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_media_tags_media_id ON public.media_tags(media_id);
CREATE INDEX IF NOT EXISTS idx_media_tags_tag_name ON public.media_tags(tag_name);

-- Daily Reports tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_daily_reports_student_id ON public.daily_reports(student_id);
CREATE INDEX IF NOT EXISTS idx_daily_reports_teacher_id ON public.daily_reports(teacher_id);
CREATE INDEX IF NOT EXISTS idx_daily_reports_report_date ON public.daily_reports(report_date);
CREATE INDEX IF NOT EXISTS idx_daily_reports_student_date ON public.daily_reports(student_id, report_date);

-- Daily Report Items tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_daily_report_items_school_id ON public.daily_report_items(school_id);
CREATE INDEX IF NOT EXISTS idx_daily_report_items_is_active ON public.daily_report_items(is_active);
CREATE INDEX IF NOT EXISTS idx_daily_report_items_sort_order ON public.daily_report_items(sort_order);

-- Daily Report Item Types tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_daily_report_item_types_report_item_id ON public.daily_report_item_types(report_item_id);
CREATE INDEX IF NOT EXISTS idx_daily_report_item_types_sort_order ON public.daily_report_item_types(sort_order);

-- Daily Report Details tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_daily_report_details_daily_report_id ON public.daily_report_details(daily_report_id);
CREATE INDEX IF NOT EXISTS idx_daily_report_details_report_item_id ON public.daily_report_details(report_item_id);

-- Medications tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_medications_student_id ON public.medications(student_id);
CREATE INDEX IF NOT EXISTS idx_medications_prescribed_by ON public.medications(prescribed_by);
CREATE INDEX IF NOT EXISTS idx_medications_is_active ON public.medications(is_active);
CREATE INDEX IF NOT EXISTS idx_medications_start_date ON public.medications(start_date);
CREATE INDEX IF NOT EXISTS idx_medications_end_date ON public.medications(end_date);
CREATE INDEX IF NOT EXISTS idx_medications_student_active ON public.medications(student_id, is_active);

-- Medication Logs tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_medication_logs_medication_id ON public.medication_logs(medication_id);
CREATE INDEX IF NOT EXISTS idx_medication_logs_administered_by ON public.medication_logs(administered_by);
CREATE INDEX IF NOT EXISTS idx_medication_logs_administered_at ON public.medication_logs(administered_at);

-- Pickup Notifications tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_pickup_notifications_student_id ON public.pickup_notifications(student_id);
CREATE INDEX IF NOT EXISTS idx_pickup_notifications_created_by ON public.pickup_notifications(created_by);
CREATE INDEX IF NOT EXISTS idx_pickup_notifications_status ON public.pickup_notifications(status);
CREATE INDEX IF NOT EXISTS idx_pickup_notifications_scheduled_time ON public.pickup_notifications(scheduled_time);
CREATE INDEX IF NOT EXISTS idx_pickup_notifications_student_status ON public.pickup_notifications(student_id, status);

-- Conversations tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_conversations_school_id ON public.conversations(school_id);
CREATE INDEX IF NOT EXISTS idx_conversations_class_id ON public.conversations(class_id);
CREATE INDEX IF NOT EXISTS idx_conversations_conversation_type ON public.conversations(conversation_type);
CREATE INDEX IF NOT EXISTS idx_conversations_is_active ON public.conversations(is_active);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message_at ON public.conversations(last_message_at);

-- Conversation Participants tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_conversation_participants_conversation_id ON public.conversation_participants(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversation_participants_user_id ON public.conversation_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_conversation_participants_is_active ON public.conversation_participants(is_active);
CREATE INDEX IF NOT EXISTS idx_conversation_participants_joined_at ON public.conversation_participants(joined_at);

-- Messages tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_sent_at ON public.messages(sent_at);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON public.messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_message_type ON public.messages(message_type);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_sent ON public.messages(conversation_id, sent_at);

-- Notifications tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_notification_type ON public.notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled_for ON public.notifications(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_notifications_sent_at ON public.notifications(sent_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, is_read);

-- Custom Notifications tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_custom_notifications_student_id ON public.custom_notifications(student_id);
CREATE INDEX IF NOT EXISTS idx_custom_notifications_created_by ON public.custom_notifications(created_by);
CREATE INDEX IF NOT EXISTS idx_custom_notifications_notification_type ON public.custom_notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_custom_notifications_status ON public.custom_notifications(status);
CREATE INDEX IF NOT EXISTS idx_custom_notifications_scheduled_for ON public.custom_notifications(scheduled_for);

-- Payment Plans tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_payment_plans_school_id ON public.payment_plans(school_id);
CREATE INDEX IF NOT EXISTS idx_payment_plans_is_active ON public.payment_plans(is_active);

-- School Payments tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_school_payments_school_id ON public.school_payments(school_id);
CREATE INDEX IF NOT EXISTS idx_school_payments_payment_plan_id ON public.school_payments(payment_plan_id);
CREATE INDEX IF NOT EXISTS idx_school_payments_payment_status ON public.school_payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_school_payments_due_date ON public.school_payments(due_date);
CREATE INDEX IF NOT EXISTS idx_school_payments_paid_date ON public.school_payments(paid_date);
CREATE INDEX IF NOT EXISTS idx_school_payments_year_month ON public.school_payments(payment_year, payment_month);

-- Student Payments tablosu index'leri
CREATE INDEX IF NOT EXISTS idx_student_payments_student_id ON public.student_payments(student_id);
CREATE INDEX IF NOT EXISTS idx_student_payments_parent_id ON public.student_payments(parent_id);
CREATE INDEX IF NOT EXISTS idx_student_payments_payment_status ON public.student_payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_student_payments_due_date ON public.student_payments(due_date);
CREATE INDEX IF NOT EXISTS idx_student_payments_paid_date ON public.student_payments(paid_date);
CREATE INDEX IF NOT EXISTS idx_student_payments_year_month ON public.student_payments(payment_year, payment_month);

COMMENT ON INDEX idx_schools_email IS 'Fast lookup for school by email';
COMMENT ON INDEX idx_users_email IS 'Fast lookup for user by email during login';
COMMENT ON INDEX idx_students_class_active IS 'Fast lookup for active students in a class';
COMMENT ON INDEX idx_daily_reports_student_date IS 'Fast lookup for student daily reports by date';
COMMENT ON INDEX idx_messages_conversation_sent IS 'Fast lookup for messages in conversation ordered by time';