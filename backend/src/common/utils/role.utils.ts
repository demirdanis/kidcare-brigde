const roles = [
  {
    name: 'SUPER_ADMIN',
    hasuraKey: 'super_admin',
    id: 'bc201a5f-0a1c-47b3-9454-1e630ef62634',
  },
  {
    name: 'PARENT',
    hasuraKey: 'student_parent',
    id: 'e82f8475-373e-4322-889d-aef659434f14',
  },
  {
    name: 'TEACHER',
    hasuraKey: 'teacher',
    id: 'e0cc8638-d16a-4f76-861a-42274bcb31f6',
  },
  {
    name: 'SCHOOL_MANAGER',
    hasuraKey: 'school_manager',
    id: '6c0e5012-06e6-4b8c-9daa-6c5af6a911d7',
  },
];

export function getRoleHasuraKeyById(roleId: string): string | null {
  return roles.find((f) => f.id === roleId)?.hasuraKey ?? null;
}
