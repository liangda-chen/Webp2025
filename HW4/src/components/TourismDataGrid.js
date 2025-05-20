import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Box, Typography } from '@mui/material';

const TourismDataGrid = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // 定義表格列
  const columns = [
    { field: 'title', headerName: '名稱', width: 300 },
    { field: 'location', headerName: '地點', width: 250 },
    { field: 'price', headerName: '票價', width: 150 },
  ];

  // 使用 useEffect 獲取資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'
        );
        const data = await response.json();
        
        // 格式化資料以符合 DataGrid 需求
        const formattedData = data.map((item, index) => ({
          id: index,
          title: item.title || '無資料',
          location: item.showInfo?.[0]?.location || '無資料',
          price: item.showInfo?.[0]?.price || '無資料',
          originalData: item // 保留原始資料
        }));
        
        setAllData(formattedData);
        setFilteredData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('獲取資料失敗:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 搜尋處理
  useEffect(() => {
    if (searchKeyword) {
      const filtered = allData.filter(item => 
        item.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredData(filtered);
      setPaginationModel(prev => ({ ...prev, page: 0 })); // 使用函數式更新
    } else {
      setFilteredData(allData);
    }
  }, [searchKeyword, allData]);

  // 清除資料
  const handleClearData = () => {
    setSearchKeyword('');
    setFilteredData(allData);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  return (
    <Box sx={{ height: 600, width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        景點觀光展覽資訊
      </Typography>
      
      {/* 搜尋框 */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="輸入名稱關鍵字..."
          variant="outlined"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          fullWidth
        />
        <Button 
          variant="contained" 
          onClick={() => setSearchKeyword(searchKeyword)}
          sx={{ minWidth: 100 }}
        >
          搜尋
        </Button>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={handleClearData}
          sx={{ minWidth: 100 }}
        >
          清除
        </Button>
      </Box>
      
      {/* DataGrid */}
      <DataGrid
        rows={filteredData}
        columns={columns}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        rowCount={filteredData.length}
        paginationMode="client"
      />
    </Box>
  );
};

export default TourismDataGrid;