import { type Component } from 'svelte';

export interface WindowState {
    id: string;
    title: string;
    component?: Component;
    props?: Record<string, any>;
    x: number;
    y: number;
    width?: number;
    height?: number;
    zIndex: number;
    visible: boolean;
    minimized?: boolean;
}

class WindowManager {
    windows = $state<WindowState[]>([]);
    maxZIndex = $state(100);
    basePosition = { x: 50, y: 50 };
    windowOffset = 30;

    openWindow(id: string, title: string, component: Component, props: Record<string, any> = {}) {
        const existing = this.windows.find(w => w.id === id);
        if (existing) {
            existing.visible = true;
            existing.minimized = false;
            this.bringToFront(id);
            return;
        }

        const count = this.windows.length;
        const x = this.basePosition.x + (count * this.windowOffset) % 200;
        const y = this.basePosition.y + (count * this.windowOffset) % 200;

        this.windows.push({
            id,
            title,
            component,
            props,
            x,
            y,
            zIndex: ++this.maxZIndex,
            visible: true
        });
    }

    closeWindow(id: string) {
        this.windows = this.windows.filter(w => w.id !== id);
    }

    bringToFront(id: string) {
        const w = this.windows.find(w => w.id === id);
        if (w) {
            w.zIndex = ++this.maxZIndex;
        }
    }

    minimizeWindow(id: string) {
        const w = this.windows.find(w => w.id === id);
        if (w) w.minimized = true;
    }

    restoreWindow(id: string) {
        const w = this.windows.find(w => w.id === id);
        if (w) {
            w.minimized = false;
            this.bringToFront(id);
        }
    }
}

export const windowManager = new WindowManager();
