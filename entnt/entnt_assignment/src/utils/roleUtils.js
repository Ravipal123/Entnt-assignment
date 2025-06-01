export const ROLES = {
  ADMIN: "Admin",
  INSPECTOR: "Inspector",
  ENGINEER: "Engineer",
};

// Role Permissions: Define what each role can access/do
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: {
    canViewShips: true,
    canEditShips: true,
    canViewComponents: true,
    canEditComponents: true,
    canViewJobs: true,
    canEditJobs: true,
    canAccessDashboard: true,
  },
  [ROLES.INSPECTOR]: {
    canViewShips: true,
    canEditShips: false,
    canViewComponents: true,
    canEditComponents: false,
    canViewJobs: true,
    canEditJobs: false,
    canAccessDashboard: true,
  },
  [ROLES.ENGINEER]: {
    canViewShips: true,
    canEditShips: false,
    canViewComponents: true,
    canEditComponents: true,
    canViewJobs: true,
    canEditJobs: true,
    canAccessDashboard: true,
  },
};

// Get permissions for a given user role
export function getPermissions(role) {
  return ROLE_PERMISSIONS[role] || {};
}

// Utility functions
export function canEditJobs(role) {
  return getPermissions(role).canEditJobs;
}

export function canEditComponents(role) {
  return getPermissions(role).canEditComponents;
}

export function canEditShips(role) {
  return getPermissions(role).canEditShips;
}

export function canAccessDashboard(role) {
  return getPermissions(role).canAccessDashboard;
}