function toggleTimelineVisibility() {
    const isMobile = window.matchMedia('(max-width: 700px)').matches;
    if (isMobile) {
        const timeline = document.querySelector('.timeline');
        timeline.style.display = timeline.style.display === 'none' ? 'grid' : 'none';
    }
}