import React, { useState } from 'react';
import { buildPrompt } from '../core/promptBuilder.js';
import { ASPECT_RATIOS, SHOT_COMPOSITIONS, FABRIC_DYNAMICS, BODY_TYPES } from '../core/userControlEngine.js';

function ProfileCard({ profiles, category }) {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  // 用戶控制選項
  const [userControls, setUserControls] = useState({
    aspectRatio: '9:16',
    shotComposition: 'fullBody',
    fabricDynamic: 'medium',
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

        {generatedPrompt && !generatedPrompt.error && (
          <button
            className={`copy-btn-full${copySuccess === 'both' ? ' copied' : ''}`}
            onClick={() => {
              const fullPrompt =
                `Positive Prompt:\n${generatedPrompt.prompt?.positive || ''}\n\n` +
                `Negative Prompt:\n${generatedPrompt.prompt?.negative || ''}`;
              copyToClipboard(fullPrompt, 'both');
            }}
          >
            {copySuccess === 'both' ? '✓ 已複製完整咒語' : '📋 複製完整咒語 (正面 + 負面)'}
          </button>
        )}

        {/* 用戶控制面板 */}
        <div className="glass-panel">
          <h4 className="panel-heading">🎛️ 出圖參數控制</h4>
          <div className="control-grid">
            <div className="control-field">
              <label>圖片比例</label>
              <select value={userControls.aspectRatio} onChange={(e) => handleControlChange('aspectRatio', e.target.value)}>
                {Object.entries(ASPECT_RATIOS).map(([key, val]) => (
                  <option key={key} value={key}>{val.name} ({val.ratio})</option>
                ))}
              </select>
            </div>

            <div className="control-field">
              <label>人物構圖</label>
              <select value={userControls.shotComposition} onChange={(e) => handleControlChange('shotComposition', e.target.value)}>
                {Object.entries(SHOT_COMPOSITIONS).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>

            <div className="control-field">
              <label>布料動態</label>
              <select value={userControls.fabricDynamic} onChange={(e) => handleControlChange('fabricDynamic', e.target.value)}>
                {Object.entries(FABRIC_DYNAMICS).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>

            <div className="control-field">
              <label>體態</label>
              <select value={userControls.bodyType} onChange={(e) => handleControlChange('bodyType', e.target.value)}>
                {Object.entries(BODY_TYPES).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 角色卡標題 hero */}
        <div className="profile-hero">
          <h2>{selectedProfile.title}</h2>
          <p>ID: {selectedProfile.id} · 分類: {category.name}</p>
        </div>

        {generatedPrompt && !generatedPrompt.error && (
          <div>
            <div className="glass-panel">
              <h4 className="panel-heading">📊 品質報告</h4>
              <div className="report-grid">
                <span className="report-chip">Token 數量<strong>{generatedPrompt.metadata?.tokenCount || 0}</strong></span>
                <span className="report-chip">風格<strong>{generatedPrompt.metadata?.style || 'N/A'}</strong></span>
                <span className="report-chip">攝影<strong>{generatedPrompt.metadata?.photographyPreset || 'N/A'}</strong></span>
              </div>
            </div>

            <div className="prompt-display">
              <h5>✅ 正面提示詞 (Positive Prompt)</h5>
              <div className="prompt-positive">
                {generatedPrompt.prompt?.positive || 'N/A'}
              </div>

              <h5 style={{ marginTop: '20px' }}>❌ 負面提示詞 (Negative Prompt)</h5>
              <div className="prompt-negative">
                {generatedPrompt.prompt?.negative || 'N/A'}
              </div>
            </div>
          </div>
        )}

        {generatedPrompt?.error && (
          <div className="error">
            <h4>生成 Prompt 失敗</h4>
            <p>{generatedPrompt.error}</p>
          </div>
        )}

        <div className="glass-panel" style={{ marginTop: '22px' }}>
          <h4 className="panel-heading">🎨 角色卡詳情</h4>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: 'var(--text-1)' }}>場景</strong>
            <div style={{ marginTop: '5px', color: 'var(--text-2)' }}>
              {selectedProfile.scene?.location || 'N/A'}
            </div>
          </div>

          {selectedProfile.scene?.props && (
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: 'var(--text-1)' }}>道具</strong>
              <div style={{ marginTop: '5px', color: 'var(--text-2)' }}>
                {selectedProfile.scene.props.join(', ')}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: 'var(--text-1)' }}>服裝</strong>
            <div style={{ marginTop: '5px', color: 'var(--text-2)' }}>
              Layer 1: {selectedProfile.costume?.layer1 || 'N/A'}
            </div>
          </div>

          {selectedProfile.action && (
            <div>
              <strong style={{ color: 'var(--text-1)' }}>動作</strong>
              <div style={{ marginTop: '5px', color: 'var(--text-2)' }}>
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
      <h3 className="section-title" style={{ fontSize: '1.3rem' }}>
        角色卡列表
      </h3>
      <p className="section-sub">{profiles.length} 張角色卡</p>
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
                <strong>場景:</strong> {profile.scene?.location?.substring(0, 50) || 'N/A'}…
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>風格:</strong> {profile.style || 'photorealistic'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginTop: '10px' }}>
                點擊查看完整提示詞 →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileCard;
