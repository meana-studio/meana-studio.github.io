function setViewportHeight() {
  // ビューポートの高さを取得
  const viewportHeight = window.innerHeight;

  // ヘッダーの高さを取得
  const headerHeight = document.querySelector('#header').offsetHeight;

  // ヘッダーを引いた後の高さを計算し、--vh に設定
  const adjustedHeight = (viewportHeight - headerHeight) * 0.01;

  // --vh カスタムプロパティを更新
  document.documentElement.style.setProperty('--vh', `${adjustedHeight}px`);
}

// 初期設定
setViewportHeight();

// ウィンドウサイズ変更時にも更新
window.addEventListener('resize', setViewportHeight);
