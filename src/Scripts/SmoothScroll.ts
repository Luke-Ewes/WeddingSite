
export function smoothScrollToElement(element: HTMLElement, duration: number = 1000, offset: number = 0) {
    const startPosition = window.scrollY;
    const targetPosition = startPosition + element.getBoundingClientRect().top - offset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animateScroll(currentTime: number) {
        if(startTime === null) {
            startTime = currentTime;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(
            0,
            startPosition + distance * easedProgress,
        );

        if(progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}