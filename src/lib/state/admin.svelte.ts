import { browser } from '$app/environment';

const ADMIN_KEY = 'hm-admin-access';

class AdminState {
    isAdmin = $state(false);

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
                localStorage.removeItem(ADMIN_KEY); // Or set 'false'
            }
        }
    }

    toggle() {
        this.setAdmin(!this.isAdmin);
    }
}

export const adminState = new AdminState();
