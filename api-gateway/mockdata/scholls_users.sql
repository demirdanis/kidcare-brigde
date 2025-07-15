-- ======================================
-- USERS TABLOSU İÇİN DUMMY DATA
-- ======================================

-- 1. SCHOOL MANAGERS (Her okul için 1 müdür)
WITH school_data AS (
    SELECT id, name, ROW_NUMBER() OVER(ORDER BY created_at) as school_num FROM public.schools
)
INSERT INTO public.users (id, email, password_hash, first_name, last_name, phone, role_id, school_id, is_active)
SELECT 
    gen_random_uuid(),
    CASE s.school_num
        WHEN 1 THEN 'mudur1@gunesanaokulu.com'
        WHEN 2 THEN 'mudur2@cicekanaokulu.com'
        WHEN 3 THEN 'mudur3@minikdunya.com'
        WHEN 4 THEN 'mudur4@renkliadimlar.com'
        WHEN 5 THEN 'mudur5@neselicocuklar.com'
    END,
    '$2a$10$rZvNmyKJx0K5dLdKxA8QWeNZqbHQmOZYh1OE8BQ2xGzYmxHp2lL6u', -- "password123" hashed
    CASE s.school_num
        WHEN 1 THEN 'Ahmet'
        WHEN 2 THEN 'Ayse'
        WHEN 3 THEN 'Mehmet'
        WHEN 4 THEN 'Fatma'
        WHEN 5 THEN 'Ali'
    END,
    CASE s.school_num
        WHEN 1 THEN 'Yilmaz'
        WHEN 2 THEN 'Kaya'
        WHEN 3 THEN 'Demir'
        WHEN 4 THEN 'Sahin'
        WHEN 5 THEN 'Aslan'
    END,
    '+9053' || (2000000 + s.school_num)::text,
    '6c0e5012-06e6-4b8c-9daa-6c5af6a911d7'::uuid, -- SCHOOL_MANAGER role
    s.id,
    true
FROM school_data s;

-- 2. TEACHERS (Her okul için 8-12 öğretmen)
WITH school_data AS (
    SELECT id, name, ROW_NUMBER() OVER(ORDER BY created_at) as school_num FROM public.schools
),
teacher_names AS (
    SELECT first_name, last_name, ROW_NUMBER() OVER() as name_num FROM (VALUES
        ('Zeynep', 'Arslan'), ('Burcu', 'Koc'), ('Selin', 'Yildiz'), ('Gizem', 'Ozturk'),
        ('Pinar', 'Sen'), ('Ezgi', 'Guler'), ('Cansu', 'Aktas'), ('Derya', 'Kaplan'),
        ('Sibel', 'Turk'), ('Melike', 'Ozkan'), ('Gamze', 'Celik'), ('Neslihan', 'Aydin'),
        ('Ozlem', 'Kara'), ('Berna', 'Polat'), ('Eda', 'Yilmaz'), ('Tulay', 'Keskin'),
        ('Serpil', 'Dogan'), ('Yesim', 'Cakir'), ('Hulya', 'Sahin'), ('Nurcan', 'Tekin'),
        ('Sevgi', 'Guney'), ('Gulsen', 'Aksoy'), ('Filiz', 'Ergin'), ('Serap', 'Ozdemir'),
        ('Nilay', 'Karaca'), ('Rukiye', 'Acar'), ('Sule', 'Yildirim'), ('Perihan', 'Cetin'),
        ('Gulay', 'Kilic'), ('Ozge', 'Avci'), ('Betul', 'Kahraman'), ('Meltem', 'Ozer'),
        ('Seda', 'Tas'), ('Aynur', 'Kurt'), ('Leyla', 'Demirel'), ('Hacer', 'Bulut'),
        ('Nurten', 'Guven'), ('Seyda', 'Yavuz'), ('Ceylan', 'Isik'), ('Ayten', 'Basak'),
        ('Rabia', 'Korkmaz'), ('Sevim', 'Mert'), ('Hande', 'Kose'), ('Dilek', 'Onal'),
        ('Gulcan', 'Erdem'), ('Necla', 'Ciftci'), ('Arzu', 'Koc'), ('Tugba', 'Gunes'),
        ('Elif', 'Ozgur'), ('Duygu', 'Kiran'), ('Basak', 'Guclu'), ('Ipek', 'Mutlu'),
        ('Canan', 'Seker'), ('Aysel', 'Akin'), ('Gonca', 'Isil'), ('Nihan', 'Oral')
    ) AS names(first_name, last_name)
)
INSERT INTO public.users (id, email, password_hash, first_name, last_name, phone, role_id, school_id, is_active)
SELECT 
    gen_random_uuid(),
    'ogretmen' || 
    ((s.school_num - 1) * 10 + tn.name_num) ||
    '@' || 
    CASE s.school_num
        WHEN 1 THEN 'gunesanaokulu.com'
        WHEN 2 THEN 'cicekanaokulu.com'
        WHEN 3 THEN 'minikdunya.com'
        WHEN 4 THEN 'renkliadimlar.com'
        WHEN 5 THEN 'neselicocuklar.com'
    END,
    '$2a$10$rZvNmyKJx0K5dLdKxA8QWeNZqbHQmOZYh1OE8BQ2xGzYmxHp2lL6u', -- "password123" hashed
    tn.first_name,
    tn.last_name,
    '+9053' || (3000000 + (s.school_num - 1) * 10 + tn.name_num)::text,
    'e0cc8638-d16a-4f76-861a-42274bcb31f6'::uuid, -- TEACHER role
    s.id,
    true
FROM school_data s
CROSS JOIN teacher_names tn
WHERE tn.name_num <= 8 + (s.school_num % 4); -- Her okul için 8-11 öğretmen

-- 3. SUPER ADMIN (1 adet)
INSERT INTO public.users (id, email, password_hash, first_name, last_name, phone, role_id, school_id, is_active) 
VALUES (
    gen_random_uuid(),
    'admin@kidcarebridge.com',
    '$2a$10$rZvNmyKJx0K5dLdKxA8QWeNZqbHQmOZYh1OE8BQ2xGzYmxHp2lL6u', -- "password123" hashed
    'System',
    'Administrator',
    '+905321111111',
    'bc201a5f-0a1c-47b3-9454-1e630ef62634'::uuid, -- SUPER_ADMIN role
    (SELECT id FROM public.schools LIMIT 1), -- İlk okula bağla
    true
);

-- Kontrol sorguları
SELECT 
    'TOPLAM USER SAYILARI' as info,
    '' as role_name,
    0 as count
UNION ALL
SELECT 
    'Role: ' || r.name,
    r.name,
    COUNT(u.id)
FROM public.roles r
LEFT JOIN public.users u ON r.id = u.role_id
GROUP BY r.id, r.name
ORDER BY count DESC;

-- Okul bazında user dağılımı
SELECT 
    s.name as school_name,
    COUNT(CASE WHEN u.role_id = '6c0e5012-06e6-4b8c-9daa-6c5af6a911d7' THEN 1 END) as managers,
    COUNT(CASE WHEN u.role_id = 'e0cc8638-d16a-4f76-861a-42274bcb31f6' THEN 1 END) as teachers,
    COUNT(u.id) as total_users
FROM public.schools s
LEFT JOIN public.users u ON s.id = u.school_id
GROUP BY s.id, s.name
ORDER BY s.created_at;

-- Test login bilgileri
SELECT 
    'TEST LOGIN ACCOUNTS' as info,
    '' as email,
    '' as password
UNION ALL
SELECT 
    u.first_name || ' ' || u.last_name || ' (' || r.name || ')',
    u.email,
    'password123'
FROM public.users u
JOIN public.roles r ON u.role_id = r.id
WHERE u.email IN (
    'admin@kidcarebridge.com',
    'mudur1@gunesanaokulu.com',
    'mudur2@cicekanaokulu.com',
    'ogretmen1@gunesanaokulu.com',
    'ogretmen2@gunesanaokulu.com'
)
ORDER BY info;