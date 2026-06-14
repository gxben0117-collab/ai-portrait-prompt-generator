
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
    'eastern-mythology': '東方神話',
    'eastern-historical-court': '東方宮廷史實',
    'eastern-ethnic-regional': '東方民族地域',
    'jiangnan-travel-photography': '江南田園旅拍',
    'world-fashion': '世界旅拍時尚',
    'epic-classic': '武俠史詩經典',
    'other': '其他',
    'dark-magic': '暗黑魔幻',
  };

  // 分類顯示順序（暗黑魔幻固定排在最下面）
  const groupOrder = Object.keys(themeGroupNames);

  return (
    <div>
      <h2 className="section-title">選擇分類</h2>
      <p className="section-sub">共 {categories.length} 個主題系列，每個系列精心設計 20 張角色卡</p>

      {Object.entries(groupedCategories)
        .sort(([a], [b]) => {
          const ia = groupOrder.indexOf(a);
          const ib = groupOrder.indexOf(b);
          return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
        })
        .map(([group, cats]) => (
        <div key={group} className="theme-group">
          <h3 className="theme-group-title">
            {themeGroupNames[group] || group}
            <span className="theme-group-count">{cats.length}</span>
          </h3>
          <div className="category-grid">
            {cats.map((category) => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => onSelect(category)}
              >
                <h3>{category.name}</h3>
                <p className="category-card-atmos">
                  {category.visualDNA?.atmosphere?.[0] || '精心設計的視覺風格'}
                </p>
                <span className="category-card-cta">查看 20 張角色卡 →</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategorySelector;
