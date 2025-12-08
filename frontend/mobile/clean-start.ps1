# Expo 프로젝트 완전 정리 및 재시작 스크립트

Write-Host "🧹 캐시 및 의존성 정리 중..." -ForegroundColor Yellow

# node_modules 삭제
if (Test-Path node_modules) {
    Remove-Item -Recurse -Force node_modules
    Write-Host "✓ node_modules 삭제 완료" -ForegroundColor Green
}

# package-lock.json 삭제
if (Test-Path package-lock.json) {
    Remove-Item -Force package-lock.json
    Write-Host "✓ package-lock.json 삭제 완료" -ForegroundColor Green
}

# .expo 폴더 삭제
if (Test-Path .expo) {
    Remove-Item -Recurse -Force .expo
    Write-Host "✓ .expo 폴더 삭제 완료" -ForegroundColor Green
}

# Metro 번들러 캐시 삭제
if (Test-Path $env:TEMP\metro-*) {
    Remove-Item -Recurse -Force $env:TEMP\metro-*
    Write-Host "✓ Metro 캐시 삭제 완료" -ForegroundColor Green
}

Write-Host "`n📦 패키지 재설치 중..." -ForegroundColor Yellow
npm install

Write-Host "`n✅ 정리 완료! 이제 다음 명령어를 실행하세요:" -ForegroundColor Green
Write-Host "   npx expo start --clear" -ForegroundColor Cyan

