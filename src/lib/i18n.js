// Dictionary for BricoleMoi (Français / Darija Marocain)

export const translations = {
  fr: {
    app_title: "BricoleMoi",
    tagline: "Dépannage d'Urgence 24/7 au Maroc",
    sub_tagline: "Plomberie & Mécanique Auto - Arrivée en moins de 30 min",
    
    // Navigation & Roles
    client_role: "Espace Client",
    maalem_role: "Espace Maalem (Artisan)",
    admin_role: "Espace Admin",
    demo_switch: "Mode Rôle :",
    pwa_install: "Installer l'App",
    pwa_installed: "PWA Activée",
    
    // Auth & OTP
    auth_title: "Connexion par N° de Téléphone",
    auth_subtitle: "Entrez votre numéro marocain (+212) pour recevoir votre code OTP",
    phone_number: "Numéro de Téléphone",
    send_code: "Recevoir le Code SMS",
    enter_otp: "Entrez le Code à 6 chiffres",
    verify_otp: "Valider et Se Connecter",
    logout: "Déconnexion",
    logged_in_as: "Connecté en tant que",
    phone_placeholder: "06 12 34 56 78",
    otp_sent_msg: "Code de vérification simulé envoyé ! Utilisez le code: 123456",

    // Emergency Request Form (Client)
    need_emergency: "De quoi avez-vous besoin d'urgence ?",
    plumbing: "Plomberie d'Urgence",
    plumbing_desc: "Fuite d'eau, canalisation bouchée, ballon d'eau chaudière",
    auto_mechanic: "Mécanique Auto & Dépannage",
    auto_mechanic_desc: "Panne de batterie, pneu crevé, moteur, remorquage",
    
    district_label: "Sélectionnez votre Quartier / Ville",
    select_district: "Choisir un quartier (ex: Maarif, Agdal, Guéliz...)",
    
    audio_note: "Message Vocal (Darija / FR)",
    audio_record_btn: "Appuyer pour Enregistrer l'Explication",
    audio_recording: "Enregistrement en cours... Cliquez pour arrêter",
    audio_recorded: "Note vocale enregistrée avec succès",
    audio_play: "Écouter l'enregistrement",
    audio_delete: "Supprimer la note vocale",

    photo_upload: "Photo de la panne / problème",
    photo_drag: "Prendre une photo ou importer un fichier",

    est_price: "Prix Estimatif du Dépannage",
    est_price_range: "150 DH - 350 DH (selon pièces & intervention)",

    submit_emergency: "LANCER L'ALERTE D'URGENCE (SOS)",
    request_submitted: "Alerte envoyée avec succès ! Les Maalems proches ont été notifiés.",

    // Interventions Status (Client & Maalem)
    my_requests: "Mes Demandes de Dépannage",
    available_leads: "Opportunités de Dépannage à proximité",
    status_pending: "En attente d'un Maalem",
    status_accepted: "Maalem en route",
    status_completed: "Dépannage Terminé avec Succès",
    status_cancelled: "Annulée",
    
    district: "Quartier",
    created_at: "Demandé il y a",
    contact_client: "Appeler le Client",
    contact_maalem: "Appeler le Maalem",
    accept_lead: "Accepter ce Lead (Déduction: 15 DH)",
    insufficient_balance: "Solde insuffisant ! Rechargez au moins 15 DH.",
    mark_completed: "Marquer comme Terminé",
    
    // Maalem Dashboard & Wallet
    maalem_welcome: "Bienvenue Maalem",
    credit_balance: "Solde de Crédits",
    specialty: "Spécialité",
    verified_badge: "Numéro Vérifié (SMS)",
    unverified_badge: "Numéro en attente",
    phone_verified_badge: "Numéro Vérifié (SMS)",
    portfolio_badge: "Portfolio Chantiers",
    reputation_score: "Score de Confiance",
    rating: "Note Moyenne",
    consecutive_stars: "Évaluations 5★ consécutives",
    recharge_bonus_count: "Bonus 100 DH débloqués",
    recharge_btn: "Recharger mon Solde",

    // Recharge Modal
    recharge_title: "Recharger votre Solde Maalem",
    recharge_desc: "Effectuez un transfert via Cash Plus, Wafacash, Barid Cash ou Virement bancaire et renseignez la référence.",
    amount_dh: "Montant (DH)",
    payment_method: "Moyen de Paiement",
    reference_ref: "Numéro de Référence du Reçu",
    submit_recharge: "Envoyer la Demande de Recharge",
    recharge_pending_notice: "Demande envoyée ! L'Admin validera votre crédit très rapidement.",

    // Review Modal
    review_title: "Évaluer l'intervention du Maalem",
    leave_rating: "Note sur 5 étoiles",
    badges_title: "Distinctions / Badges décernés",
    badge_fast: "Ultra Rapide",
    badge_honest: "Honnête & Transparent",
    badge_clean: "Travail Propre",
    badge_fair_price: "Prix Raisonnable",
    comment_placeholder: "Laissez un commentaire sur le travail du Maalem...",
    submit_review: "Envoyer l'Avis",
    review_submitted: "Merci pour votre évaluation !",

    // Admin Dashboard
    admin_title: "Panneau de Contrôle Administrateur",
    pending_recharges: "Demandes de Recharge en Attente",
    pending_verifications: "Portfolios & Profils Artisans",
    validate: "Valider & Créditer",
    reject: "Refuser",
    all_interventions: "Toutes les Interventions du Réseau",
    total_maalems: "Maalems Inscrits",
    total_revenue_leads: "Revenus Leads (15 DH)",

    // General & UI
    loading: "Chargement...",
    close: "Fermer",
    cancel: "Annuler",
    confirm: "Confirmer",
    phone: "Téléphone",
    dh: "DH"
  },

  ar: {
    app_title: "بريكول معايا (BricoleMoi)",
    tagline: "منصة الإغاثة والمساعدة السريعة 24/7 بالمغرب",
    sub_tagline: "السباكة وميكانيك السيارات - المعلم يوصل عندك فقل من 30 دقيقة",
    
    // Navigation & Roles
    client_role: "فضاء الزبون",
    maalem_role: "فضاء المعلم (المهني)",
    admin_role: "فضاء الإدارة",
    demo_switch: "وضع التجربة:",
    pwa_install: "تثبيت التطبيق",
    pwa_installed: "التطبيق مفيّف",
    
    // Auth & OTP
    auth_title: "تسجيل الدخول برقم الهاتف",
    auth_subtitle: "أدخل رقم هاتفك المغربي (+212) لتلقي رمز التفعيل SMS",
    phone_number: "رقم الهاتف",
    send_code: "إرسال رمز التفعيل",
    enter_otp: "أدخل الرمز المكون من 6 أرقام",
    verify_otp: "تأكيد وتأكيد الدخول",
    logout: "تسجيل الخروج",
    logged_in_as: "مسجل كـ",
    phone_placeholder: "06 12 34 56 78",
    otp_sent_msg: "تم إرسال رمز التجربة التجريبي! استخدم الرمز: 123456",

    // Emergency Request Form (Client)
    need_emergency: "شنو محتاج دابا عاجلا؟",
    plumbing: "سباكة مستعجلة (بلومبي)",
    plumbing_desc: "تسرب المياه، قادوس مخنوق، سخان الماء، الشابو",
    auto_mechanic: "ميكانيك السيارات وتخريج الطريق",
    auto_mechanic_desc: "باتري طايح، رويدة مفشوشة، المحرك، الديباناج",
    
    district_label: "حدد الحي / المدينة ديالك",
    select_district: "اختر الحي (مثال: المعاريف، أقدال، جيليز...)",
    
    audio_note: "تسجيل صوتي (أوديو بالدارجة)",
    audio_record_btn: "اضغط لتسجيل شرح المشكل بالصوت",
    audio_recording: "جاري التسجيل... اضغط لإيقاف التسجيل",
    audio_recorded: "تم حفظ التسجيل الصوتي بنجاح",
    audio_play: "استماع للتسجيل",
    audio_delete: "حذف التسجيل الصوتي",

    photo_upload: "صورة المشكل / العطب",
    photo_drag: "صوّر المشكل أو اختر صورة من الهاتف",

    est_price: "الثمن التقديري للإصلاح",
    est_price_range: "150 درهم - 350 درهم (حسب القطع والخدمة)",

    submit_emergency: "إرسال نداء الاستغاثة فوراً (SOS)",
    request_submitted: "تم إرسال الطلب بنجاح! المعلمين القريبين منك في الطريق.",

    // Interventions Status (Client & Maalem)
    my_requests: "طلبات الإصلاح ديالي",
    available_leads: "فرص التدخل القريبة منك",
    status_pending: "في انتظار قبول المعلم",
    status_accepted: "المعلم في الطريق عندك",
    status_completed: "تم الإصلاح بنجاح",
    status_cancelled: "ملغاة",
    
    district: "الحي",
    created_at: "منذ",
    contact_client: "الاتصال بالزبون",
    contact_maalem: "الاتصال بالمعلم",
    accept_lead: "قبول طلب الزبون (اقتطاع 15 درهم)",
    insufficient_balance: "الرصيد غير كافي! شحن 15 درهم على الأقل.",
    mark_completed: "تأكيد انتهاء الإصلاح",
    
    // Maalem Dashboard & Wallet
    maalem_welcome: "مرحباً بك يا معلم",
    credit_balance: "رصيد الحساب",
    specialty: "التخصص",
    verified_badge: "رقم هاتف موثق (SMS)",
    unverified_badge: "الرقم قيد التحقق",
    phone_verified_badge: "رقم هاتف موثق (SMS)",
    portfolio_badge: "معرض الأعمال المنجزة",
    reputation_score: "مؤشر الثقة والسمعة",
    rating: "التقييم العام",
    consecutive_stars: "تقييمات 5 نجوم متتالية",
    recharge_bonus_count: "مكافآت 100 درهم المحصلة",
    recharge_btn: "شحن الرصيد",

    // Recharge Modal
    recharge_title: "شحن رصيد المعلم",
    recharge_desc: "قم بإرسال المبلغ عبر كاش بلس، وفاكاش، بريد كاش أو تحويل بنكي ورقم الحساب، ثم أدخل رقم الوصل.",
    amount_dh: "المبلغ (بالدرهم)",
    payment_method: "طريقة الدفع",
    reference_ref: "رقم الوصل / المرجع",
    submit_recharge: "إرسال طلب الشحن",
    recharge_pending_notice: "تم إرسال الطلب! ستقوم الإدارة بتأكيد الرصيد في أقرب وقت.",

    // Review Modal
    review_title: "تقييم خدمة المعلم",
    leave_rating: "التقييم من 5 نجوم",
    badges_title: "الشارات والأوسمة المستحقة",
    badge_fast: "سريع جداً",
    badge_honest: "معقول وأمين",
    badge_clean: "خدمة نِقية",
    badge_fair_price: "ثمن مناسب",
    comment_placeholder: "اكتب انطباعك عن خدمة المعلم...",
    submit_review: "إرسال التقييم",
    review_submitted: "شكراً على تقييمك!",

    // Admin Dashboard
    admin_title: "لوحة تحكم الإدارة",
    pending_recharges: "طلبات شحن الرصيد المعلقة",
    pending_verifications: "معارض أعمال وملفات المعلمين",
    validate: "تأكيد وإضافة الرصيد",
    reject: "رفض",
    all_interventions: "جميع التدخلات في الشبكة",
    total_maalems: "المعلمين المسجلين",
    total_revenue_leads: "مداخيل الطلبات (15 درهم)",

    // General & UI
    loading: "جاري التحميل...",
    close: "إغلاق",
    cancel: "إلغاء",
    confirm: "تأكيد",
    phone: "الهاتف",
    dh: "درهم"
  }
};
