#!/bin/bash
# 批量清理 costume.layers 的模板詞

cd "C:\AIProjects\002專案進行中\美圖咒語系統\src\profiles"

count=0

for file in *-profiles.json; do
    echo "處理: $file"

    # 移除 ", XXX styling" 模式
    sed -i 's/, [a-zA-Z ]* styling//g' "$file"

    # 移除 ", XXX appearance" 模式
    sed -i 's/, [a-zA-Z ]* appearance//g' "$file"

    # 移除 ", XXX beauty" 模式
    sed -i 's/, [a-zA-Z ]* beauty//g' "$file"

    # 移除孤立的 styling/appearance/beauty
    sed -i 's/, styling//g' "$file"
    sed -i 's/, appearance//g' "$file"
    sed -i 's/, beauty//g' "$file"

    count=$((count + 1))
done

echo ""
echo "完成！已處理 $count 個檔案"
