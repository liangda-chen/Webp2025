function loadData() {
    const openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
    
    fetch(openUrl)
        .then(response => response.json())
        .then(data => addNewData(data))
        .catch(error => console.error('載入資料失敗:', error));
}

// 新增資料到表格
function addNewData(dataset) {
    const tableBody = document.querySelector("#csie tbody");
    tableBody.innerHTML = ""; // 清空現有內容

    dataset.forEach(data => {
        const row = tableBody.insertRow();
        const showInfo = data.showInfo?.[0] || {};
        
        row.insertCell(0).textContent = data.title || '無資料';
        row.insertCell(1).textContent = showInfo.location || '無資料';
        row.insertCell(2).textContent = showInfo.price || '無資料';
    });
}

// 刪除舊資料
function delOldData() {
    const tableBody = document.querySelector("#csie tbody");
    tableBody.innerHTML = "";
    console.log("已刪除所有資料列");
}

// 頁面載入時執行
document.addEventListener("DOMContentLoaded", loadData);