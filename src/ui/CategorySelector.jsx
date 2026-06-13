import React from 'react';

function CategorySelector({ categories, onSelect }) {
  // 按主題組分組
  const groupedCategories = categories.reduce((groups, category) => {
    const group = category.themeGroup || 'other';
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(category);
    return groups;
  }, {});

  const themeGroupNames = {
    'dark-romance': '暗黑浪漫',
    'dark-fantasy': '暗黑奇幻',
    'eastern-mythology': '東方神話',
    'eastern-historical-court': '東方宮廷史實',
    'eastern-ethnic-regional': '東方民族地域',
    'jiangnan-travel-photography': '江南田園旅拍',
    'world-fashion': '世界旅拍時尚',
    'epic-classic': '武俠史詩經典',
    'other': '其他',
  };

  return (
    <div>
      <h2 style={{ marginBottom: '30px', color: '#667eea' }}>
        選擇分類 ({categories.length} 個)
      </h2>

      {Object.entries(groupedCategories).map(([group, cats]) => (
        <div key={group} style={{ marginBottom: '40px' }}>
          <h3 style={{
            color: '#764ba2',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #eee'
          }}>
            {themeGroupNames[group] || group}
          </h3>
          <div className="category-grid">
            {cats.map((category) => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => onSelect(category)}
              >
                <h3>{category.name}</h3>
                <p style={{ marginTop: '10px', fontSize: '0.85rem' }}>
                  {category.visualDNA?.atmosphere?.[0] || '精心設計的視覺風格'}
                </p>
                <p style={{ marginTop: '8px', fontSize: '0.8rem', opacity: 0.8 }}>
                  點擊查看 20 張角色卡
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategorySelector;
