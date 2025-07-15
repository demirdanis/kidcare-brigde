INSERT INTO public.schools (id, name, address, phone, email, website, description, is_active) VALUES
(gen_random_uuid(), 'Gunes Anaokulu', 'Alsancak Mah. 1453 Sk. No:15, Konak/Izmir', '+905321234567', 'info@gunesanaokulu.com', 'www.gunesanaokulu.com', 'Izmir''in en kaliteli anaokulu', true),
(gen_random_uuid(), 'Cicek Kres ve Anaokulu', 'Bornova Mah. Ataturk Cad. No:45, Bornova/Izmir', '+905321234568', 'info@cicekanaokulu.com', 'www.cicekanaokulu.com', 'Doga dostu egitim anlayisi', true),
(gen_random_uuid(), 'Minik Dunya Anaokulu', 'Karsiyaka Mah. Inonu Blv. No:123, Karsiyaka/Izmir', '+905321234569', 'info@minikdunya.com', 'www.minikdunya.com', 'Cocuklarin hayal dunyasi', true),
(gen_random_uuid(), 'Renkli Adimlar Kres', 'Gaziemir Mah. Cumhuriyet Cad. No:78, Gaziemir/Izmir', '+905321234570', 'info@renkliadimlar.com', 'www.renkliadimlar.com', 'Her adim bir renk', true),
(gen_random_uuid(), 'Neseli Cocuklar Anaokulu', 'Bayrakli Mah. Demokrat Cad. No:234, Bayrakli/Izmir', '+905321234571', 'info@neselicocuklar.com', 'www.neselicocuklar.com', 'Mutlu cocuklar, parlak gelecek', true);

-- Kontrol sorgusu
SELECT 
    id,
    name,
    address,
    phone,
    email,
    website,
    description,
    is_active,
    created_at
FROM public.schools
ORDER BY created_at;