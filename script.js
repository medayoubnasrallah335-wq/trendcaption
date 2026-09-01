document.addEventListener("DOMContentLoaded", function () {

    const generateBtn = document.getElementById("generateBtn");
    const topicInput = document.getElementById("topic");
    const platformInput = document.getElementById("platform");
    const copyAllBtn = document.getElementById("copyAllBtn");

    generateBtn.addEventListener("click", generateContent);

    if (copyAllBtn) {
        copyAllBtn.addEventListener("click", copyAll);
    }

    function generateContent() {

        const topic = topicInput.value.trim();
        const platform = platformInput.value;

        if (topic === "") {
            alert("⚠️ اكتب موضوع الفيديو أولاً");
            topicInput.focus();
            return;
        }

        let hook = "";
        let caption = "";
        let hashtags = "";

        if (platform === "tiktok") {

            hook = "🔥 استنى! لازم تشوف هذا قبل ما تكمل التمرير 😱";

            caption = `شنوّة رأيك في ${topic}؟ 👀🔥
إذا عجبك الفيديو، لا تنسى تعمل Like ❤️ وتبعني للمزيد!`;

            hashtags = `#${cleanTag(topic)} #fyp #foryou #viral #tiktok #ترند`;

        } else if (platform === "instagram") {

            hook = `✨ شوف شنوّة صار مع ${topic}!`;

            caption = `🔥 ${topic}
شنوّة رأيك؟ اكتبلي في التعليقات 👇
وخلي ❤️ إذا عجبك المحتوى!`;

            hashtags = `#${cleanTag(topic)} #instagram #reels #viral #explore #ترند`;

        } else {

            hook = `🚀 هذا الشيء لازم تشوفه إذا تحب ${topic}!`;

            caption = `🔥 اليوم نحكيو على ${topic}.
إذا استفدت من الفيديو، اعمل Like 👍 واشترك باش ما يفوتك حتى جديد!`;

            hashtags = `#${cleanTag(topic)} #shorts #youtube #viral #trending`;
        }

        document.getElementById("hook").textContent = hook;
        document.getElementById("caption").textContent = caption;
        document.getElementById("hashtags").textContent = hashtags;

        const score = calculateViralScore(topic, platform);

        document.getElementById("viralScore").textContent = score + "/100";

        document.getElementById("viralMessage").textContent =
            getViralMessage(score);

        document.getElementById("results").classList.remove("hidden");

        document.getElementById("results").scrollIntoView({
            behavior: "smooth"
        });
    }

    function calculateViralScore(topic, platform) {

        let score = 55;

        if (topic.length >= 5) score += 10;
        if (topic.length >= 10) score += 5;

        if (platform === "tiktok") score += 15;
        if (platform === "instagram") score += 10;
        if (platform === "youtube") score += 8;

        if (
            topic.toLowerCase().includes("free fire") ||
            topic.toLowerCase().includes("gaming") ||
            topic.toLowerCase().includes("football") ||
            topic.includes("كرة") ||
            topic.includes("ترند")
        ) {
            score += 10;
        }

        return Math.min(score, 100);
    }

    function getViralMessage(score) {

        if (score >= 90) {
            return "🔥 ممتاز! المحتوى عنده قابلية كبيرة للانتشار.";
        }

        if (score >= 75) {
            return "🚀 قوي! عندك فرصة باهية باش يجذب المشاهدين.";
        }

        if (score >= 60) {
            return "👍 باهي! تنجم تزيد Hook أقوى باش تحسّن النتيجة.";
        }

        return "💡 جرّب موضوع أكثر ترند أو Hook أقوى.";
    }

    function cleanTag(text) {

        return text
            .replace(/\s+/g, "")
            .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "");
    }

    function copyText(id) {

        const element = document.getElementById(id);

        if (!element) return;

        const text = element.textContent;

        copyToClipboard(text);
    }

    function copyAll() {

        const hook = document.getElementById("hook").textContent;
        const caption = document.getElementById("caption").textContent;
        const hashtags = document.getElementById("hashtags").textContent;

        const allText =
`🎯 HOOK

${hook}

✍️ CAPTION

${caption}

#️⃣ HASHTAGS

${hashtags}`;

        copyToClipboard(allText);
    }

    function copyToClipboard(text) {

        if (navigator.clipboard && window.isSecureContext) {

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

        const textarea = document.createElement("textarea");

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

    window.copyText = copyText;

});
