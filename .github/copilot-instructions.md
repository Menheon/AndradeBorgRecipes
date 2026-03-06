# Coding Instructions for AndradeBorg React Project

## General Guidelines

### TypeScript

- **Always use TypeScript over JavaScript** - No exceptions
- **Avoid type casting** - Use proper type definitions and type guards instead
- Use strict TypeScript configuration for better type safety

### React Development

- **Use React functional components in arrow function style** - Not React.FC
- Prefer hooks over class components
- Implement proper error boundaries for component error handling
- Naming convention for .tsx files is PascalCase for components and camelCase for hooks

```typescript
// ✅ Correct component style
const MyComponent = ({ prop1, prop2 }: Props) => {
  return <div>Content</div>;
};

// ❌ Avoid
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>Content</div>;
};
```

### Styling

- **Always use Tailwind CSS classnames** for styling
- Follow mobile-first responsive design principles
- Use Tailwind's utility classes over custom CSS
- Never use inline styling.

```typescript
// ✅ Good Tailwind usage
<div className="flex flex-col gap-4 p-6 bg-neutral-0 rounded-lg shadow-md md:flex-row md:gap-6">
```

### Documentation

- **Always add JSDoc documentation** for components, functions, and complex logic
- Document component props with clear descriptions
- Include usage examples in component documentation
- Document business logic and complex algorithms

```typescript
/**
 * Electricity product details component for displaying active product information
 * @param installationId - Unique identifier for the installation
 * @returns React component displaying product details
 */
const ProductDetailsActive = ({ installationId }: Props) => {
```

### Code Generation

- Follow established patterns when creating new features
- Maintain consistent file naming conventions

### React Performance

- Use React.memo for expensive components
- Implement proper dependency arrays in hooks
- Avoid creating objects/functions in render
- Use callback optimization when necessary

## Accessibility

### A11y Requirements

- Ensure all interactive elements are keyboard accessible
- Provide proper ARIA labels and roles
- Test with screen readers
- Maintain proper color contrast ratios
- Include focus management for dynamic content

## Code Quality

### Linting & Formatting

- Follow ESLint configuration strictly
- Use Prettier for consistent formatting
- Implement pre-commit hooks for code quality
- Maintain consistent import ordering

### Git Workflow

- Write descriptive commit messages
- Implement proper code review processes
