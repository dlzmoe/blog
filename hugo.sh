hugo

time=$(date "+%Y-%m-%d %H:%M:%S")
echo $time

git add .
git commit -m "自动执行构建脚本 🎓$time"
git push
