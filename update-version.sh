#!/bin/bash
# 版本更新腳本
# 使用方法: ./update-version.sh [patch|minor|major] "更新說明"

VERSION_TYPE=${1:-patch}
UPDATE_MESSAGE=${2:-"常規更新"}

echo "🔄 開始版本更新流程..."
echo ""

# 讀取當前版本
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📌 當前版本: v$CURRENT_VERSION"

# 計算新版本
if [ "$VERSION_TYPE" = "patch" ]; then
    # 修訂號 +0.01
    NEW_VERSION=$(node -p "
        const v = '$CURRENT_VERSION'.split('.');
        v[2] = (parseFloat(v[2]) + 0.01).toFixed(2);
        v.join('.');
    ")
elif [ "$VERSION_TYPE" = "minor" ]; then
    # 次版本 +0.1
    NEW_VERSION=$(node -p "
        const v = '$CURRENT_VERSION'.split('.');
        v[1] = (parseFloat(v[1]) + 0.1).toFixed(1);
        v[2] = '0';
        v.join('.');
    ")
elif [ "$VERSION_TYPE" = "major" ]; then
    # 主版本 +1
    NEW_VERSION=$(node -p "
        const v = '$CURRENT_VERSION'.split('.');
        v[0] = (parseInt(v[0]) + 1).toString();
        v[1] = '0';
        v[2] = '0';
        v.join('.');
    ")
else
    echo "❌ 錯誤: 版本類型必須是 patch, minor 或 major"
    exit 1
fi

echo "🆕 新版本: v$NEW_VERSION"
echo ""

# 更新 package.json
echo "📝 更新 package.json..."
npm version $NEW_VERSION --no-git-tag-version

# 提示更新 CHANGELOG.md
echo ""
echo "⚠️  請手動更新 CHANGELOG.md："
echo ""
echo "## [$NEW_VERSION] - $(date +%Y-%m-%d)"
echo ""
echo "### 🔧 優化"
echo "- $UPDATE_MESSAGE"
echo ""
echo "---"
echo ""

# 詢問是否繼續
read -p "是否已更新 CHANGELOG.md? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 已取消版本更新"
    exit 1
fi

# 構建
echo ""
echo "🔨 開始構建..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 構建失敗"
    exit 1
fi

echo ""
echo "✅ 構建成功"
echo ""

# Git 操作
echo "📦 提交代碼..."
git add .
git commit -m "v$NEW_VERSION: $UPDATE_MESSAGE"
git tag "v$NEW_VERSION"

echo ""
echo "🎉 版本更新完成！"
echo ""
echo "📋 摘要:"
echo "  舊版本: v$CURRENT_VERSION"
echo "  新版本: v$NEW_VERSION"
echo "  更新說明: $UPDATE_MESSAGE"
echo ""
echo "🚀 下一步操作:"
echo "  1. 推送代碼: git push origin master --tags"
echo "  2. 部署網站: git subtree push --prefix dist origin gh-pages"
echo ""
