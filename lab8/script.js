let errorCount = 0;
const maxErrorsBeforePenalty = 3;
const penaltyChars = 6;

window.addEventListener("DOMContentLoaded", function() {
    add_new_chars(); // 初始化內容
    updateErrorCounter();
});

window.addEventListener("keyup", function(e) {
    const container = document.getElementById("container");
    let currentText = container.textContent.trim();

    if (currentText.length > 0 && currentText[0] === e.key) {
        // 正確輸入
        container.textContent = currentText.substring(1);
        container.classList.add("correct");
        setTimeout(() => container.classList.remove("correct"), 200);
        errorCount = 0; // 重置錯誤計數
    } else if (currentText.length > 0) {
        // 錯誤輸入 (只在有內容時才計數)
        errorCount++;
        container.classList.add("wrong");
        setTimeout(() => container.classList.remove("wrong"), 200);
        
        // 檢查是否達到懲罰條件
        if (errorCount >= maxErrorsBeforePenalty) {
            add_new_chars(penaltyChars); // 額外增加6個字元作為懲罰
            errorCount = 0; // 重置計數
        }
    }

    updateErrorCounter();
    add_new_chars(); // 正常增加1-3個字元
});

function add_new_chars(extraChars = 0) {
    const container = document.getElementById("container");
    let currentText = container.textContent;

    // 限制最大長度
    if (currentText.length > 50) {
        container.textContent = currentText.substring(20);
    }

    // 只使用英文字母（大小寫）
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let length = extraChars > 0 ? extraChars : Math.floor(Math.random() * 3) + 1;
    let randomStr = "";

    for (let i = 0; i < length; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    container.textContent += randomStr;
}

function updateErrorCounter() {
    document.getElementById("error-counter").textContent = 
        `連續錯誤次數: ${errorCount}/${maxErrorsBeforePenalty}`;
}