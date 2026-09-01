const generateBtn = document.getElementById("generateBtn");
const topicInput = document.getElementById("topic");
const platformInput = document.getElementById("platform");

generateBtn.addEventListener("click", generateContent);

function generateContent() {
    const topic = topicInput.value.trim();
    const platform = platformInput.value;

    if (topic === "") {
        alert("⚠️ اكتب موضوع الفيديو أولاً");
        return;
    }

    let hook = "";
    let caption = "";
    let hashtags = "";

    if (platform === "tiktok") {
        hook = `🔥 استنى! لازم تشوف هذا قبل ما تكمل التمرير 😱`;

        caption = `شنوّة رأيك في ${topic}؟ 👀🔥
إذا عجبك الفيديو، لا تنسى تعمل Like ❤️ وتبعني للمزيد!`;

        hashtags = `#${cleanTag(topic)} #fyp #foryou #viral #tiktok #ترند`;
    }

    else if (platform === "instagram") {
        hook = `✨ شوف شنوّة صار مع ${topic}!`;

        caption = `🔥 ${topic}
شنوّة رأيك؟ اكتبلي في التعليقات 👇
وخلي ❤️ إذا عجبك المحتوى!`;

        hashtags = `#${cleanTag(topic)} #instagram #reels #viral #explore #ترند`;
    }

    else {
        hook = `🚀 هذا الشيء لازم تشوفه إذا تحب ${topic}!`;

        caption = `🔥 اليوم نحكيو على ${topic}.
إذا استفدت من الفيديو، اعمل Like 👍 واشترك باش ما يفوتك حتى جديد!`;

        hashtags = `#${cleanTag(topic)} #shorts #youtube #viral #trending`;
    }

    document.getElementById("hook").textContent = hook;
    document.getElementById("caption").textContent = caption;
    document.getElementById("hashtags").textContent = hashtags;

    document.getElementById("results").classList.remove("hidden");
}

function cleanTag(text) {
    return text
        .replace(/\s+/g, "")
        .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "");
}

function copyText(id) {
    const text = document.getElementById(id).textContent;

    navigator.clipboard.writeText(text).then(() => {
        alert("✅ تم النسخ!");
    }).catch(() => {
        alert("❌ ما نجّمش ننسخ النص");
    });
}
