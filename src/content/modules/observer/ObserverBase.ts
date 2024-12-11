export class ObserverBase {
    public observer: MutationObserver = new MutationObserver((mutations) => this.onChange(mutations));

    target: Node | null = null;
    isBinded = false;
    initOption: MutationObserverInit = { childList: true, subtree: true, characterData: true };

    bind() {
        if (!this.target) throw new Error("Target is null");
        this.observer.observe(this.target, this.initOption);
        this.isBinded = true;
    }

    unbind() {
        this.observer.disconnect();
        this.isBinded = false;
    }

    onChange(mutations: MutationRecord[]): void {
        throw new Error("No Implementation for Observer");
    }
}
