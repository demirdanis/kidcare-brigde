-- ======================================
-- STUDENTS VE PARENTS İÇİN DUMMY DATA
-- ======================================

-- Önce classes tablosuna ihtiyacımız var, hızlıca oluşturalım
-- 1. CLASSES (Her okul için 5-8 sınıf)
WITH school_data AS (
    SELECT id, name, ROW_NUMBER() OVER(ORDER BY created_at) as school_num FROM public.schools
),
class_names AS (
    SELECT class_name, description, age_min, age_max, ROW_NUMBER() OVER() as class_num FROM (VALUES
        ('Papatya Sinifi', 'Neseli papatyalar gibi buyuyen cocuklar', 3, 4),
        ('Gul Sinifi', 'Guller gibi kokulu ve guzel', 4, 5),
        ('Lale Sinifi', 'Renkli laleler gibi cesitli', 3, 4),
        ('Karanfil Sinifi', 'Karanfil kokulu dostluklar', 4, 5),
        ('Menekse Sinifi', 'Mor menekseler gibi nazik', 3, 4),
        ('Zambak Sinifi', 'Beyaz zambaklar gibi temiz', 4, 5),
        ('Orkide Sinifi', 'Orkide gibi ozel ve degerli', 5, 6),
        ('Leylak Sinifi', 'Leylak kokulu bahar', 3, 4),
        ('Nergis Sinifi', 'Sari nergisler gibi parlak', 4, 5),
        ('Sumbul Sinifi', 'Sumbul gibi hos kokulu', 3, 4)
    ) AS classes(class_name, description, age_min, age_max)
),
teachers AS (
    SELECT u.id, u.school_id, ROW_NUMBER() OVER(PARTITION BY u.school_id ORDER BY u.created_at) as teacher_num
    FROM public.users u
    WHERE u.role_id = 'e0cc8638-d16a-4f76-861a-42274bcb31f6'::uuid
)
INSERT INTO public.classes (id, name, description, age_group_min, age_group_max, capacity, school_id, main_teacher_id, secondary_teacher_id, is_active)
SELECT 
    gen_random_uuid(),
    cn.class_name,
    cn.description,
    cn.age_min,
    cn.age_max,
    15 + (random() * 10)::int, -- 15-25 kapasite
    s.id,
    t1.id,
    t2.id,
    true
FROM school_data s
CROSS JOIN class_names cn
LEFT JOIN teachers t1 ON t1.school_id = s.id AND t1.teacher_num = ((cn.class_num - 1) % 8) + 1
LEFT JOIN teachers t2 ON t2.school_id = s.id AND t2.teacher_num = ((cn.class_num - 1) % 8) + 2
WHERE cn.class_num <= 5 + (s.school_num % 4); -- Her okul için 5-8 sınıf

-- 2. STUDENTS (Her sınıf için 10-20 öğrenci)
WITH class_data AS (
    SELECT c.id as class_id, c.school_id, c.capacity, 
           ROW_NUMBER() OVER(ORDER BY c.created_at) as class_order
    FROM public.classes c
),
student_names AS (
    SELECT first_name, gender, ROW_NUMBER() OVER() as name_order FROM (VALUES
        -- Erkek isimleri
        ('Ahmet', 'M'), ('Mehmet', 'M'), ('Ali', 'M'), ('Mustafa', 'M'), ('Emre', 'M'),
        ('Cem', 'M'), ('Serkan', 'M'), ('Burak', 'M'), ('Murat', 'M'), ('Kemal', 'M'),
        ('Ozan', 'M'), ('Kaan', 'M'), ('Emir', 'M'), ('Berk', 'M'), ('Deniz', 'M'),
        ('Ege', 'M'), ('Kuzey', 'M'), ('Atlas', 'M'), ('Aslan', 'M'), ('Alp', 'M'),
        ('Arda', 'M'), ('Mert', 'M'), ('Yigit', 'M'), ('Eren', 'M'), ('Omer', 'M'),
        ('Berkay', 'M'), ('Doruk', 'M'), ('Tuna', 'M'), ('Kerem', 'M'), ('Ayaz', 'M'),
        ('Baran', 'M'), ('Cinar', 'M'), ('Demir', 'M'), ('Efe', 'M'), ('Gokturk', 'M'),
        ('Hamza', 'M'), ('Ismail', 'M'), ('Kagan', 'M'), ('Levent', 'M'), ('Nazim', 'M'),
        ('Oguz', 'M'), ('Riza', 'M'), ('Sarp', 'M'), ('Taha', 'M'), ('Umut', 'M'),
        ('Volkan', 'M'), ('Yavuz', 'M'), ('Zeki', 'M'), ('Baris', 'M'), ('Can', 'M'),
        
        -- Kız isimleri
        ('Ayse', 'F'), ('Fatma', 'F'), ('Emine', 'F'), ('Hatice', 'F'), ('Zeynep', 'F'),
        ('Elif', 'F'), ('Merve', 'F'), ('Busra', 'F'), ('Esra', 'F'), ('Irem', 'F'),
        ('Sude', 'F'), ('Ecrin', 'F'), ('Ela', 'F'), ('Defne', 'F'), ('Ada', 'F'),
        ('Asya', 'F'), ('Lila', 'F'), ('Maya', 'F'), ('Nisa', 'F'), ('Pinar', 'F'),
        ('Selin', 'F'), ('Tuana', 'F'), ('Yasemin', 'F'), ('Zehra', 'F'), ('Cemre', 'F'),
        ('Duru', 'F'), ('Ece', 'F'), ('Gizem', 'F'), ('Hilal', 'F'), ('Ipek', 'F'),
        ('Kivilcim', 'F'), ('Leman', 'F'), ('Melisa', 'F'), ('Nehir', 'F'), ('Ozge', 'F'),
        ('Pelin', 'F'), ('Reyhan', 'F'), ('Su', 'F'), ('Tulay', 'F'), ('Ulku', 'F'),
        ('Vildan', 'F'), ('Yagmur', 'F'), ('Zumra', 'F'), ('Beril', 'F'), ('Cansu', 'F'),
        ('Damla', 'F'), ('Esma', 'F'), ('Funda', 'F'), ('Gul', 'F'), ('Hulya', 'F'),
        ('Ilayda', 'F'), ('Kardelen', 'F'), ('Leyla', 'F'), ('Miray', 'F'), ('Nazli', 'F')
    ) AS names(first_name, gender)
),
surnames AS (
    SELECT surname, ROW_NUMBER() OVER() as surname_order FROM (VALUES
        ('Yilmaz'), ('Kaya'), ('Demir'), ('Sahin'), ('Celik'), ('Yildiz'), ('Yildirim'), ('Ozturk'),
        ('Aydin'), ('Ozkan'), ('Kaplan'), ('Koc'), ('Arslan'), ('Dogan'), ('Aslan'), ('Polat'),
        ('Kara'), ('Cakir'), ('Akin'), ('Guler'), ('Karaca'), ('Ozdemir'), ('Avci'), ('Tekin'),
        ('Gunes'), ('Acar'), ('Turk'), ('Cetin'), ('Bulut'), ('Erdogan'), ('Ozer'), ('Yavuz'),
        ('Korkmaz'), ('Tas'), ('Isik'), ('Aktas'), ('Demirel'), ('Keskin'), ('Onal'), ('Guven'),
        ('Akcay'), ('Bayrak'), ('Ciftci'), ('Ergin'), ('Kocak'), ('Mutlu'), ('Seker'), ('Oral'),
        ('Bas'), ('Kilic'), ('Mert'), ('Sen'), ('Tokay'), ('Ural'), ('Zengin'), ('Aksoy')
    ) AS surnames(surname)
),
blood_types AS (
    SELECT blood_type, ROW_NUMBER() OVER() as bt_order FROM (VALUES 
        ('A+'), ('A-'), ('B+'), ('B-'), ('AB+'), ('AB-'), ('0+'), ('0-')
    ) AS bt(blood_type)
),
student_combinations AS (
    SELECT 
        cd.class_id,
        cd.school_id,
        sn.first_name,
        sn.gender,
        sur.surname,
        bt.blood_type,
        ROW_NUMBER() OVER(PARTITION BY cd.class_id ORDER BY random()) as student_order_in_class
    FROM class_data cd
    CROSS JOIN student_names sn
    CROSS JOIN surnames sur
    CROSS JOIN blood_types bt
    WHERE MOD((cd.class_order + sn.name_order + sur.surname_order + bt.bt_order), 100) < 20 -- Her sınıf için ~20 öğrenci
)
INSERT INTO public.students (id, first_name, last_name, birth_date, gender, blood_type, allergies, medical_notes, class_id, school_id, is_active, enrollment_date)
SELECT 
    gen_random_uuid(),
    sc.first_name,
    sc.surname,
    CURRENT_DATE - INTERVAL '3 years' - (random() * INTERVAL '1 year'), -- 2-4 yaş arası
    sc.gender,
    sc.blood_type,
    CASE 
        WHEN random() < 0.1 THEN 'Findik alerjisi'
        WHEN random() < 0.15 THEN 'Sut alerjisi'
        WHEN random() < 0.2 THEN 'Yumurta alerjisi'
        ELSE NULL
    END,
    CASE 
        WHEN random() < 0.05 THEN 'Astim hastasi'
        WHEN random() < 0.1 THEN 'Epilepsi hastasi - ilac kullaniyor'
        ELSE NULL
    END,
    sc.class_id,
    sc.school_id,
    true,
    CURRENT_DATE - (random() * INTERVAL '365 days') -- Son 1 yıl içinde kayıt
FROM student_combinations sc
WHERE sc.student_order_in_class <= 10 + (random() * 10)::int; -- Her sınıf için 10-20 öğrenci

-- 3. PARENTS (Her öğrenci için 1 parent)
WITH student_data AS (
    SELECT 
        s.id as student_id, 
        s.first_name, 
        s.last_name, 
        s.school_id, 
        ROW_NUMBER() OVER(ORDER BY s.created_at) as student_num 
    FROM public.students s
),
parent_names AS (
    SELECT first_name, gender, ROW_NUMBER() OVER() as parent_order FROM (VALUES
        -- Erkek parent isimleri
        ('Ahmet', 'M'), ('Mehmet', 'M'), ('Ali', 'M'), ('Mustafa', 'M'), ('Emre', 'M'),
        ('Cem', 'M'), ('Serkan', 'M'), ('Burak', 'M'), ('Murat', 'M'), ('Kemal', 'M'),
        ('Ozan', 'M'), ('Kaan', 'M'), ('Ibrahim', 'M'), ('Hasan', 'M'), ('Huseyin', 'M'),
        ('Yusuf', 'M'), ('Omer', 'M'), ('Bekir', 'M'), ('Erhan', 'M'), ('Gokhan', 'M'),
        ('Ismail', 'M'), ('Ramazan', 'M'), ('Recep', 'M'), ('Suleyman', 'M'), ('Veli', 'M'),
        
        -- Kadın parent isimleri
        ('Ayse', 'F'), ('Fatma', 'F'), ('Emine', 'F'), ('Hatice', 'F'), ('Zeynep', 'F'),
        ('Elif', 'F'), ('Merve', 'F'), ('Busra', 'F'), ('Esra', 'F'), ('Irem', 'F'),
        ('Selin', 'F'), ('Pinar', 'F'), ('Gizem', 'F'), ('Ozge', 'F'), ('Burcu', 'F'),
        ('Sibel', 'F'), ('Derya', 'F'), ('Gamze', 'F'), ('Eda', 'F'), ('Serpil', 'F'),
        ('Gulsen', 'F'), ('Sevgi', 'F'), ('Filiz', 'F'), ('Nilay', 'F'), ('Rukiye', 'F')
    ) AS names(first_name, gender)
)
INSERT INTO public.users (id, email, password_hash, first_name, last_name, phone, role_id, school_id, is_active)
SELECT 
    gen_random_uuid(),
    'veli' || sd.student_num || '@' || 
    CASE (sd.student_num % 5) + 1
        WHEN 1 THEN 'gunesanaokulu.com'
        WHEN 2 THEN 'cicekanaokulu.com'
        WHEN 3 THEN 'minikdunya.com'
        WHEN 4 THEN 'renkliadimlar.com'
        WHEN 5 THEN 'neselicocuklar.com'
    END,
    '$2a$10$rZvNmyKJx0K5dLdKxA8QWeNZqbHQmOZYh1OE8BQ2xGzYmxHp2lL6u', -- "password123" hashed
    pn.first_name,
    sd.last_name, -- Aynı soyisim
    '+9053' || (4000000 + sd.student_num)::text,
    'e82f8475-373e-4322-889d-aef659434f14'::uuid, -- PARENT role
    sd.school_id,
    true
FROM student_data sd
CROSS JOIN parent_names pn
WHERE pn.parent_order = (sd.student_num % 50) + 1; -- Her öğrenci için 1 parent

-- 4. Bazı ebeveynlerin 2. çocuğu (aynı okuldaki kardeşler)
WITH existing_parents AS (
    SELECT DISTINCT 
        p.id as parent_id, 
        p.school_id, 
        p.last_name,
        ROW_NUMBER() OVER(ORDER BY random()) as parent_order
    FROM public.users p
    WHERE p.role_id = 'e82f8475-373e-4322-889d-aef659434f14'::uuid
),
available_classes AS (
    SELECT id as class_id, school_id FROM public.classes
),
second_child_names AS (
    SELECT first_name, gender, ROW_NUMBER() OVER() as name_order FROM (VALUES
        ('Emirhan', 'M'), ('Alperen', 'M'), ('Batuhan', 'M'), ('Furkan', 'M'), ('Onur', 'M'),
        ('Ege', 'M'), ('Bora', 'M'), ('Tolga', 'M'), ('Taylan', 'M'), ('Riza', 'M'),
        ('Melisa', 'F'), ('Naz', 'F'), ('Lara', 'F'), ('Begum', 'F'), ('Derin', 'F'),
        ('Irmak', 'F'), ('Sena', 'F'), ('Azra', 'F'), ('Deren', 'F'), ('Eylul', 'F')
    ) AS names(first_name, gender)
),
second_children_data AS (
    SELECT 
        ep.parent_id,
        ep.school_id,
        ep.last_name,
        scn.first_name,
        scn.gender,
        ac.class_id,
        ROW_NUMBER() OVER(PARTITION BY ep.parent_id) as child_order
    FROM existing_parents ep
    CROSS JOIN available_classes ac
    CROSS JOIN second_child_names scn
    WHERE ac.school_id = ep.school_id
    AND ep.parent_order <= 50 -- İlk 50 parent'tan bazıları 2. çocuk sahibi
    AND random() < 0.3 -- %30 ihtimalle 2. çocuk
)
INSERT INTO public.students (id, first_name, last_name, birth_date, gender, blood_type, allergies, medical_notes, class_id, school_id, is_active, enrollment_date)
SELECT 
    gen_random_uuid(),
    scd.first_name,
    scd.last_name,
    CURRENT_DATE - INTERVAL '3 years' - (random() * INTERVAL '1 year'), -- 2-4 yaş arası
    scd.gender,
    (ARRAY['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'])[floor(random() * 8 + 1)],
    CASE 
        WHEN random() < 0.1 THEN 'Polen alerjisi'
        WHEN random() < 0.15 THEN 'Balik alerjisi'
        ELSE NULL
    END,
    CASE 
        WHEN random() < 0.05 THEN 'Kalp rahatsizligi'
        ELSE NULL
    END,
    scd.class_id,
    scd.school_id,
    true,
    CURRENT_DATE - (random() * INTERVAL '200 days') -- Son 200 gün içinde kayıt
FROM second_children_data scd
WHERE scd.child_order = 1; -- Her parent için max 1 ikinci çocuk

-- Kontrol sorguları
SELECT 
    'CLASSES' as table_name, 
    COUNT(*) as total_count 
FROM public.classes
UNION ALL
SELECT 'STUDENTS', COUNT(*) FROM public.students
UNION ALL
SELECT 'PARENTS', COUNT(*) FROM public.users WHERE role_id = 'e82f8475-373e-4322-889d-aef659434f14'::uuid
ORDER BY table_name;

-- Okul bazında dağılım
SELECT 
    s.name as school_name,
    COUNT(c.id) as classes,
    COUNT(st.id) as students,
    COUNT(CASE WHEN u.role_id = 'e82f8475-373e-4322-889d-aef659434f14' THEN 1 END) as parents
FROM public.schools s
LEFT JOIN public.classes c ON s.id = c.school_id
LEFT JOIN public.students st ON s.id = st.school_id
LEFT JOIN public.users u ON s.id = u.school_id
GROUP BY s.id, s.name
ORDER BY s.created_at;

-- Test login bilgileri - Parents
SELECT 
    'PARENT TEST ACCOUNTS' as info,
    '' as email,
    '' as password
UNION ALL
SELECT 
    p.first_name || ' ' || p.last_name || ' (Parent)',
    p.email,
    'password123'
FROM public.users p
WHERE p.role_id = 'e82f8475-373e-4322-889d-aef659434f14'::uuid
AND p.email IN (
    'veli1@gunesanaokulu.com',
    'veli2@gunesanaokulu.com',
    'veli3@gunesanaokulu.com'
)
ORDER BY info;