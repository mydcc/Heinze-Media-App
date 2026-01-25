import { browser } from '$app/environment';

const ADMIN_KEY = 'hm-admin-access';

class AdminState {
    isAdmin = $state(false);
    // Derived state for reactive admin status display
    adminStatus = $derived(this.isAdmin ? 'Admin Mode' : 'Viewer Mode');

    constructor() {
        if (browser) {
            const saved = localStorage.getItem(ADMIN_KEY);
            this.isAdmin = saved === 'true';
        }
    }

    setAdmin(status: boolean) {
        this.isAdmin = status;
        if (browser) {
            if (status) {
                localStorage.setItem(ADMIN_KEY, 'true');
            } else {
                localStorage.removeItem(ADMIN_KEY);
            }
        }
    }

    toggle() {
        this.setAdmin(!this.isAdmin);
    }
}

export const adminState = new AdminState();
