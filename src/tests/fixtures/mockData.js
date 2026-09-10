export const mockUser = {
  id: 'user_123456789',
  name: 'Alex Learner',
  email: 'alex@example.com',
  role: 'learner',
  accountType: 'individual_learner',
  status: 'active',
  emailVerified: true
};

export const mockTutor = {
  id: 'tutor_987654321',
  name: 'Sarah Instructor',
  email: 'sarah@example.com',
  role: 'tutor',
  accountType: 'individual_tutor',
  status: 'active',
  emailVerified: true
};

export const mockCourses = [
  {
    id: 'course_1',
    title: 'Mastering React 19',
    description: 'Learn modern React hooks, state management, and testing.',
    category: 'Development',
    price: 49.99,
    status: 'published',
    visibility: 'public'
  },
  {
    id: 'course_2',
    title: 'Node.js Microservices Architecture',
    description: 'Build enterprise scalable backend APIs with Express and MongoDB.',
    category: 'Backend',
    price: 79.99,
    status: 'published',
    visibility: 'public'
  }
];
