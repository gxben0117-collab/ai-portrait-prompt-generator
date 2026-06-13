import React, { useState } from 'react';
import { buildPrompt, generateQualityReport } from '../core/promptBuilder.js';
import { ASPECT_RATIOS, SHOT_COMPOSITIONS, FABRIC_DYNAMICS, BODY_TYPES } from '../core/userControlEngine.js';

function ProfileCard({ profiles, category }) {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  // 用戶控制選項
  const [userControls, setUserControls] = useState({
    aspectRatio: '3:4',
    shotComposition: 'halfBody',
    fabricDynamic: 'static',
    bodyType: 'default',
  });

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setCopySuccess('');

    // 生成 Prompt (帶用戶控制參數)
    try {
      const result = buildPrompt(category, profile, { userControls });
      setGeneratedPrompt(result);
    } catch (err) {
      console.error('Failed to build prompt:', err);
      setGeneratedPrompt({ error: err.message });
    }
  };

  const handleControlChange = (controlName, value) => {
    const newControls = { ...userControls, [controlName]: value };
    setUserControls(newControls);

    // 如果已選擇角色卡，自動重新生成
    if (selectedProfile) {
      try {
        const result = buildPrompt(category, selectedProfile, { userControls: newControls });
        setGeneratedPrompt(result);
      } catch (err) {
        console.error('Failed to rebuild prompt:', err);
      }
    }
  };

  const handleBack = () => {
    setSelectedProfile(null);
    setGeneratedPrompt(null);
    setCopySuccess('');
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('複製失敗:', err);
      alert('複製失敗，請手動選取文字複製');
    }
  };

  if (selectedProfile) {
    return (
      <div>
        <button className="back-button" onClick={handleBack}>
          ← 返回角色卡列表
        </button>

        {/* 用戶控制面板 */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          border: '2px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginBottom: '15px' }}>🎛️ 出圖參數控制</h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>圖片比例:</label>
              <select value={userControls.aspectRatio} onChange={(e) => handleControlChange('aspectRatio', e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}>
                {Object.entries(ASPECT_RATIOS).map(([key, val]) => (
                  <option key={key} value={key}>{val.name} ({val.ratio})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>人物構圖:</label>
              <select value={userControls.shotComposition} onChange={(e) => handleControlChange('shotComposition', e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}>
                {Object.entries(SHOT_COMPOSITIONS).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>布料動態:</label>
              <select value={userControls.fabricDynamic} onChange={(e) => handleControlChange('fabricDynamic', e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}>
                {Object.entries(FABRIC_DYNAMICS).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>體態:</label>
              <select value={userControls.bodyType} onChange={(e) => handleControlChange('bodyType', e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}>
                {Object.entries(BODY_TYPES).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '15px',
          marginBottom: '20px'
        }}>
          <h2>{selectedProfile.title}</h2>
          <p style={{ marginTop: '10px', opacity: 0.9 }}>
            ID: {selectedProfile.id} | 分類: {category.name}
          </p>
        </div>

        {generatedPrompt && !generatedPrompt.error && (
          <div>
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <h4 style={{ color: '#667eea', marginBottom: '10px' }}>📊 品質報告</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>Token 數量: <strong>{generatedPrompt.metadata?.tokenCount || 0}</strong></div>
                <div>風格: <strong>{generatedPrompt.metadata?.style || 'N/A'}</strong></div>
                <div>攝影: <strong>{generatedPrompt.metadata?.photographyPreset || 'N/A'}</strong></div>
                <div>驗證: <strong style={{ color: generatedPrompt.validation?.allValid ? '#2d5' : '#d52' }}>
                  {generatedPrompt.validation?.allValid ? '✅ 通過' : '❌ 失敗'}
                </strong></div>
              </div>
            </div>

            <button
              onClick={() => {
                const fullPrompt = `Positive Prompt:\n${generatedPrompt.prompt?.positive || ''}\n\nNegative Prompt:\n${generatedPrompt.prompt?.negative || ''}`;
                copyToClipboard(fullPrompt, 'both');
              }}
              style={{
                background: copySuccess === 'both' ? '#28a745' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                width: '100%',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                marginBottom: '20px'
              }}
            >
              {copySuccess === 'both' ? '✓ 已複製完整咒語' : '📋 複製完整咒語 (正面 + 負面)'}
            </button>

            <div className="prompt-display">
              <h5 style={{ marginBottom: '10px' }}>✅ 正面提示詞 (Positive Prompt)</h5>
              <div className="prompt-positive">
                {generatedPrompt.prompt?.positive || 'N/A'}
              </div>

              <h5 style={{ marginBottom: '10px', marginTop: '20px' }}>❌ 負面提示詞 (Negative Prompt)</h5>
              <div className="prompt-negative">
                {generatedPrompt.prompt?.negative || 'N/A'}
              </div>
            </div>

            {generatedPrompt.warnings && generatedPrompt.warnings.length > 0 && (
              <div style={{
                background: '#fff3cd',
                border: '1px solid #ffc107',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '20px'
              }}>
                <h5 style={{ color: '#856404', marginBottom: '10px' }}>⚠️ 警告</h5>
                {generatedPrompt.warnings.map((warning, idx) => (
                  <div key={idx} style={{ color: '#856404', fontSize: '0.9rem' }}>
                    • {warning}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {generatedPrompt?.error && (
          <div className="error">
            <h4>生成 Prompt 失敗</h4>
            <p>{generatedPrompt.error}</p>
          </div>
        )}

        <div style={{
          background: 'white',
          border: '2px solid #eee',
          padding: '20px',
          borderRadius: '10px',
          marginTop: '20px'
        }}>
          <h4 style={{ color: '#667eea', marginBottom: '15px' }}>🎨 角色卡詳情</h4>

          <div style={{ marginBottom: '15px' }}>
            <strong>場景:</strong>
            <div style={{ marginLeft: '15px', color: '#666', marginTop: '5px' }}>
              {selectedProfile.scene?.location || 'N/A'}
            </div>
          </div>

          {selectedProfile.scene?.props && (
            <div style={{ marginBottom: '15px' }}>
              <strong>道具:</strong>
              <div style={{ marginLeft: '15px', color: '#666', marginTop: '5px' }}>
                {selectedProfile.scene.props.join(', ')}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <strong>服裝:</strong>
            <div style={{ marginLeft: '15px', color: '#666', marginTop: '5px' }}>
              Layer 1: {selectedProfile.costume?.layer1 || 'N/A'}
            </div>
          </div>

          {selectedProfile.action && (
            <div style={{ marginBottom: '15px' }}>
              <strong>動作:</strong>
              <div style={{ marginLeft: '15px', color: '#666', marginTop: '5px' }}>
                {selectedProfile.action.pose || 'N/A'}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>
        角色卡列表 ({profiles.length} 張)
      </h3>
      <div className="profile-grid">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="profile-card"
            onClick={() => handleProfileClick(profile)}
          >
            <h4>{profile.title}</h4>
            <div className="profile-details">
              <div style={{ marginBottom: '8px' }}>
                <strong>場景:</strong> {profile.scene?.location?.substring(0, 50) || 'N/A'}...
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>風格:</strong> {profile.style || 'photorealistic'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '10px' }}>
                點擊查看完整提示詞
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileCard;
