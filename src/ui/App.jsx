import { useState, useEffect } from 'react';
import CategorySelector from './CategorySelector.jsx';
import ProfileCard from './ProfileCard.jsx';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      // 動態載入所有分類
      const categoryModules = import.meta.glob('../categories/**/*.js');
      const loadedCategories = [];

      for (const path in categoryModules) {
        try {
          const module = await categoryModules[path]();
          // 找到導出的分類對象（通常是以 _CATEGORY 結尾）
          const categoryKey = Object.keys(module).find(key => key.endsWith('_CATEGORY'));
          if (categoryKey && module[categoryKey]) {
            loadedCategories.push(module[categoryKey]);
          }
        } catch (err) {
          console.warn(`Failed to load category from ${path}:`, err);
        }
      }

      setCategories(loadedCategories);
      setLoading(false);
    } catch (err) {
      setError(`載入分類失敗: ${err.message}`);
      setLoading(false);
    }
  };

  const loadProfiles = async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category);

      // 使用 import.meta.glob 動態載入 JSON
      const profileModules = import.meta.glob('../profiles/*.json');
      const profilePath = `../profiles/${category.id}-profiles.json`;

      try {
        if (profileModules[profilePath]) {
          const module = await profileModules[profilePath]();
          setProfiles(module.default || module);
        } else {
          // 如果還沒有角色卡，顯示佔位信息
          console.warn(`No profiles found for ${category.id}`);
          setProfiles([]);
        }
      } catch (err) {
        console.warn(`Failed to load profiles for ${category.id}:`, err);
        setProfiles([]);
      }

      setLoading(false);
    } catch (err) {
      setError(`載入角色卡失敗: ${err.message}`);
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setProfiles([]);
  };

  if (loading && categories.length === 0) {
    return (
      <div className="app">
        <div className="header">
          <h1>美圖咒語系統</h1>
          <p>AI 人像提示詞生成引擎 · 五層模組化架構</p>
        </div>
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>載入中…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="header">
          <h1>美圖咒語系統</h1>
        </div>
        <div className="container">
          <div className="error">
            <h3>發生錯誤</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h1>美圖咒語系統</h1>
        <p>AI 人像提示詞生成引擎 · 五層模組化架構，一鍵生成電影級咒語</p>
      </div>

      <div className="container">
        {!selectedCategory ? (
          <CategorySelector
            categories={categories}
            onSelect={loadProfiles}
          />
        ) : (
          <div>
            <button className="back-button" onClick={handleBack}>
              ← 返回分類列表
            </button>
            <h2 className="section-title">{selectedCategory.name}</h2>
            <p className="section-sub">
              {selectedCategory.visualDNA?.atmosphere?.[0] || '精心設計的視覺風格'}
            </p>
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>載入角色卡中…</p>
              </div>
            ) : profiles.length > 0 ? (
              <ProfileCard profiles={profiles} category={selectedCategory} />
            ) : (
              <div className="loading">
                <h3 style={{ color: 'var(--text-1)', marginBottom: '10px' }}>角色卡開發中</h3>
                <p>此分類的 20 張角色卡正在精心設計中，敬請期待。</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
