document.addEventListener("DOMContentLoaded", function () {

    const generateBtn = document.getElementById("generateBtn");
    const generateAgainBtn = document.getElementById("generateAgainBtn");
    const copyAllBtn = document.getElementById("copyAllBtn");

    const topicInput = document.getElementById("topic");
    const categoryInput = document.getElementById("category");
    const languageInput = document.getElementById("language");
    const hookStyleInput = document.getElementById("hookStyle");
    const platformInput = document.getElementById("platform");

    /* =========================
       GENERATE
    ========================= */

    generateBtn.addEventListener("click", generateContent);

    if (generateAgainBtn) {
        generateAgainBtn.addEventListener("click", generateContent);
    }

    if (copyAllBtn) {
        copyAllBtn.addEventListener("click", copyAll);
    }


    function generateContent() {

        const topic = topicInput.value.trim();
        const category = categoryInput.value;
        const language = languageInput.value;
        const hookStyle = hookStyleInput.value;
        const platform = platformInput.value;

        if (topic === "") {
            alert("⚠️ اكتب موضوع الفيديو أولاً");
            topicInput.focus();
            return;
        }

        let hook = "";
        let caption = "";
        let hashtags = "";

        /* =========================
           TUNISIAN
        ========================= */

        if (language === "tunisian") {

            hook = getTunisianHook(topic, hookStyle);

            caption = `🔥 ${topic}

شنوّة رأيك في الموضوع هذا؟ 👀
إذا عجبك الفيديو اعمل ❤️ وابعثو لصاحبك!

تابعني للمزيد 🔥`;

            hashtags = getHashtags(topic, category, platform);

        }

        /* =========================
           ARABIC
        ========================= */

        else if (language === "arabic") {

            hook = getArabicHook(topic, hookStyle);

            caption = `🔥 ${topic}

ما رأيك في هذا الموضوع؟ 👀
إذا أعجبك الفيديو اضغط ❤️ وشاركه مع أصدقائك!

تابعني للمزيد 🔥`;

            hashtags = getHashtagsArabic(topic, category);

        }

        /* =========================
           ENGLISH
        ========================= */

        else if (language === "english") {

            hook = getEnglishHook(topic, hookStyle);

            caption = `🔥 ${topic}

What do you think about this? 👀
Like ❤️ and share this video with your friends!

Follow for more 🔥`;

            hashtags = `#${cleanTag(topic)} #fyp #viral #trending #shorts #contentcreator`;

        }

        /* =========================
           FRENCH
        ========================= */

        else {

            hook = getFrenchHook(topic, hookStyle);

            caption = `🔥 ${topic}

Qu'en pensez-vous ? 👀
Like ❤️ et partage cette vidéo avec tes amis !

Abonne-toi pour plus de contenu 🔥`;

            hashtags = `#${cleanTag(topic)} #viral #tendance #pourtoi #reels #shorts`;

        }


        /* =========================
           CATEGORY EXTRA
        ========================= */

        if (category === "gaming") {

            hashtags += " #gaming #gamer #gameplay";

        }

        else if (category === "football") {

            hashtags += " #football #soccer #foot";

        }

        else if (category === "funny") {

            hashtags += " #funny #comedy #ضحك";

        }

        else if (category === "music") {

            hashtags += " #music #song #musique";

        }

        else if (category === "money") {

            hashtags += " #money #success #business";

        }

        else if (category === "love") {

            hashtags += " #love #couple #feelings";

        }


        /* =========================
           DISPLAY
        ========================= */

        document.getElementById("hook").textContent = hook;

        document.getElementById("caption").textContent = caption;

        document.getElementById("hashtags").textContent = hashtags;


        /* =========================
           VIRAL SCORE
        ========================= */

        const score = calculateViralScore(
            topic,
            category,
            language,
            hookStyle,
            platform
        );

        document.getElementById("viralScore").textContent =
            score + "/100";

        document.getElementById("viralMessage").textContent =
            getViralMessage(score);


        document.getElementById("results").classList.remove("hidden");


        /* =========================
           SAVE SETTINGS
        ========================= */

        localStorage.setItem("trendTopic", topic);
        localStorage.setItem("trendCategory", category);
        localStorage.setItem("trendLanguage", language);
        localStorage.setItem("trendHook", hookStyle);
        localStorage.setItem("trendPlatform", platform);


        document.getElementById("results").scrollIntoView({
            behavior: "smooth"
        });

    }


    /* =========================
       TUNISIAN HOOKS
    ========================= */

    function getTunisianHook(topic, style) {

        if (style === "shock") {
            return `😱 ما كنتش نتوقع اللي يصير مع ${topic}!`;
        }

        if (style === "funny") {
            return `😂 استنى شوف شصار مع ${topic}!`;
        }

        if (style === "story") {
            return `📖 خليني نحكيلك الحكاية الكاملة متاع ${topic}...`;
        }

        if (style === "question") {
            return `❓ تعرف شنوّة يصير إذا تعمل ${topic}؟`;
        }

        return `👀 استنى! لازم تشوف هذا قبل ما تكمل التمرير... ${topic} 🔥`;
    }


    /* =========================
       ARABIC HOOKS
    ========================= */

    function getArabicHook(topic, style) {

        if (style === "shock") {
            return `😱 لن تصدق ما حدث مع ${topic}!`;
        }

        if (style === "funny") {
            return `😂 انتظر حتى ترى ما حدث مع ${topic}!`;
        }

        if (style === "story") {
            return `📖 دعني أحكي لك القصة الكاملة عن ${topic}...`;
        }

        if (style === "question") {
            return `❓ هل تعرف ماذا يحدث مع ${topic}؟`;
        }

        return `👀 توقف! يجب أن ترى هذا قبل أن تكمل التمرير... ${topic} 🔥`;
    }


    /* =========================
       ENGLISH HOOKS
    ========================= */

    function getEnglishHook(topic, style) {

        if (style === "shock") {
            return `😱 You won't believe what happened with ${topic}!`;
        }

        if (style === "funny") {
            return `😂 Wait until you see what happened with ${topic}!`;
        }

        if (style === "story") {
            return `📖 Let me tell you the full story about ${topic}...`;
        }

        if (style === "question") {
            return `❓ Did you know this about ${topic}?`;
        }

        return `👀 STOP scrolling! You need to see this about ${topic}! 🔥`;
    }


    /* =========================
       FRENCH HOOKS
    ========================= */

    function getFrenchHook(topic, style) {

        if (style === "shock") {
            return `😱 Vous ne croirez jamais ce qui s'est passé avec ${topic} !`;
        }

        if (style === "funny") {
            return `😂 Attendez de voir ce qui s'est passé avec ${topic} !`;
        }

        if (style === "story") {
            return `📖 Laisse-moi te raconter toute l'histoire de ${topic}...`;
        }

        if (style === "question") {
            return `❓ Tu savais ça sur ${topic} ?`;
        }

        return `👀 ARRÊTE de scroller ! Tu dois voir ça sur ${topic} ! 🔥`;
    }


    /* =========================
       HASHTAGS
    ========================= */

    function getHashtags(topic, category, platform) {

        let tags = `#${cleanTag(topic)} #viral #fyp #foryou`;

        if (platform === "tiktok") {
            tags += " #tiktok";
        }

        else if (platform === "instagram") {
            tags += " #instagram #reels";
        }

        else {
            tags += " #youtube #shorts";
        }

        return tags;
    }


    function getHashtagsArabic(topic, category) {

        let tags =
            `#${cleanTag(topic)} #ترند #اكسبلور #فيديو #viral`;

        if (category === "football") {
            tags += " #كرة_القدم";
        }

        if (category === "gaming") {
            tags += " #العاب #قيمز";
        }

        return tags;
    }


    /* =========================
       VIRAL SCORE
    ========================= */

    function calculateViralScore(
        topic,
        category,
        language,
        hookStyle,
        platform
    ) {

        let score = 55;

        if (topic.length >= 5) {
            score += 5;
        }

        if (topic.length >= 10) {
            score += 5;
        }

        if (
            category === "gaming" ||
            category === "football" ||
            category === "funny"
        ) {
            score += 10;
        }

        if (hookStyle === "shock") {
            score += 10;
        }

        if (hookStyle === "curiosity") {
            score += 8;
        }

        if (hookStyle === "question") {
            score += 5;
        }

        if (platform === "tiktok") {
            score += 7;
        }

        if (platform === "instagram") {
            score += 5;
        }

        return Math.min(score, 100);
    }


    function getViralMessage(score) {

        if (score >= 90) {
            return "🔥 قوي برشة! المحتوى عنده قابلية ممتازة للانتشار.";
        }

        if (score >= 80) {
            return "🚀 ممتاز! الـHook مناسب ويشد الانتباه.";
        }

        if (score >= 70) {
            return "🔥 باهي! تنجم تحسّن الـHook أكثر.";
        }

        if (score >= 60) {
            return "👍 بداية جيدة، جرّب موضوع أكثر ترند.";
        }

        return "💡 جرّب Hook أقوى وموضوع أكثر جذبًا.";
    }


    /* =========================
       CLEAN TAG
    ========================= */

    function cleanTag(text) {

        return text
            .replace(/\s+/g, "")
            .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "");
    }


    /* =========================
       COPY
    ========================= */

    function copyText(id) {

        const element = document.getElementById(id);

        if (!element) return;

        copyToClipboard(element.textContent);
    }


    function copyAll() {

        const hook =
            document.getElementById("hook").textContent;

        const caption =
            document.getElementById("caption").textContent;

        const hashtags =
            document.getElementById("hashtags").textContent;

        const score =
            document.getElementById("viralScore").textContent;


        const allText =
`🎯 HOOK

${hook}

✍️ CAPTION

${caption}

#️⃣ HASHTAGS

${hashtags}

📊 VIRAL SCORE

${score}`;


        copyToClipboard(allText);
    }


    function copyToClipboard(text) {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            navigator.clipboard.writeText(text)
                .then(function () {
                    alert("✅ تم النسخ!");
                })
                .catch(function () {
                    fallbackCopy(text);
                });

        } else {

            fallbackCopy(text);

        }

    }


    function fallbackCopy(text) {

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";

        document.body.appendChild(textarea);

        textarea.select();

        try {

            document.execCommand("copy");

            alert("✅ تم النسخ!");

        } catch (error) {

            alert("❌ ما نجّمش ننسخ النص");

        }

        document.body.removeChild(textarea);
    }


    /* =========================
       QUICK TOPICS
    ========================= */

    window.setTopic = function (topic) {

        topicInput.value = topic;

        topicInput.focus();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    /* =========================
       LOAD SAVED SETTINGS
    ========================= */

    const savedTopic =
        localStorage.getItem("trendTopic");

    const savedCategory =
        localStorage.getItem("trendCategory");

    const savedLanguage =
        localStorage.getItem("trendLanguage");

    const savedHook =
        localStorage.getItem("trendHook");

    const savedPlatform =
        localStorage.getItem("trendPlatform");


    if (savedTopic) {
        topicInput.value = savedTopic;
    }

    if (savedCategory) {
        categoryInput.value = savedCategory;
    }

    if (savedLanguage) {
        languageInput.value = savedLanguage;
    }

    if (savedHook) {
        hookStyleInput.value = savedHook;
    }

    if (savedPlatform) {
        platformInput.value = savedPlatform;
    }

});
