# Formx 🎯

A modern, production-ready form components library built with Next.js 15, React 19, Tailwind CSS and Shadcn UI. This template provides a comprehensive collection of reusable, accessible, and customizable form components to accelerate your web application development. Perfect for building modern, type-safe forms with server-side validation.

## ✨ Features

- 🎨 **Customizable Form Components** - Pre-built components for inputs, selects, and more
- 📱 **Responsive Design** - Mobile-first approach with adaptive layouts
- 🎯 **Form Validation** - Built-in validation using Zod schema with real-time error handling
- ♿ **Accessibility** - Built with Radix UI primitives for robust accessibility support
- 🔄 **State Management** - Clean and efficient form state handling with useFormAction hook
- 💾 **Local Storage** - Automatic form draft saving and restoration
- 🌐 **Next.js Integration** - Optimized for server components and app router
- 🎭 **Modular Structure** - Easy to extend and customize for your specific needs

## 🚀 Getting Started

### Using this Template

1. **Click the "Use this template" button** at the top of this repository
2. **Select "Create a new repository"**
3. **Choose a name** for your repository and create it
4. **Clone your new repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

### Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

The template follows a modular and scalable architecture:

```
src/
├── app/                    # Next.js app router pages
│   ├── input/             # Input form example with validation
│   │   ├── page.jsx       # Login form implementation
│   │   ├── action.js      # Server action for form submission
│   │   └── validationSchema.js # Zod validation schema
│   ├── select/            # Select form example
│   │   ├── page.jsx       # Selection form implementation
│   │   ├── action.js      # Server action for form submission
│   │   └── validationSchema.js # Zod validation schema
│   ├── layout.js          # Root layout with navigation
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── nav/              # Navigation components
│   │   └── form-sidebar.jsx # Sidebar navigation
│   └── ui/               # Reusable UI components
│       ├── form/         # Form-specific components
│       │   ├── field.jsx # Field wrapper with context
│       │   ├── form.jsx  # Form wrapper with validation
│       │   ├── input.jsx # Input component with local storage
│       │   ├── select.jsx # Select component with local storage
│       │   └── index.js  # Component exports
│       ├── button.jsx    # Button component
│       └── card.jsx      # Card component
└── lib/
    ├── hooks/            # Custom React hooks
    └── utils/            # Utility functions
```

## 🛠️ Manual Integration Guide

1.  **Initial Setup and Dependencies**

    a. Install core dependencies:

    ```bash
    npx shadcn@latest init
    npm install zod localforage @radix-ui/react-label
    ```

    b. Configure component aliases in `components.json`:

    ```json
    "aliases": {
     "components": "@/components",
     "utils": "@/lib/utils/cn",
     "ui": "@/components/ui",
     "lib": "@/lib",
     "hooks": "@/lib/hooks"
    },
    ```

    c. Set up core form components:

    - Create directory structure:
      ```
      src/
      ├── components/ui/form/
      ├── lib/hooks/
      └── lib/utils/
      ```

    d. Copy core files:

    - From template's `components/ui/form/`:
      - `form.jsx` → your `components/ui/form/`
      - `field.jsx` → your `components/ui/form/`
    - From template's `lib/`:
      - `hooks/useFormAction.js` → your `lib/hooks/`
      - `utils/localStorage.js` → your `lib/utils/`
      - `utils/cn.js` → your `lib/utils/`
    - Delete your `lib/utils.js`, if needed.

    e. Create form components index:

    ```javascript
    // src/components/ui/form/index.js
    export * from "./field";
    export * from "./form";
    ```

2.  **Input Component Integration**

    a. Add the input component:

    - Copy `input.jsx` from template's `components/ui/form/` to your form components directory
    - Update your form components index:
      ```javascript
      // src/components/ui/form/index.js
      export * from "./field";
      export * from "./form";
      export * from "./input"; // Add this line
      ```

    b. Add example implementation:

    - Install required dependencies (if not already installed).

    ```bash
    npx shadcn@latest add button card
    ```

    - Copy the entire `input` directory from template's `src/app/` to your app directory
    - This includes:
      - Form component implementation
      - Server action
      - Validation schema

3.  **Select Component Integration**

    a. Install select component dependency:

    ```bash
    npm install @radix-ui/react-select
    ```

    b. Add the select component:

    - Copy `select.jsx` from template's `components/ui/form/` to your form components directory
    - Update your form components index:
      ```javascript
      // src/components/ui/form/index.js
      export * from "./field";
      export * from "./form";
      export * from "./input"; // if you already add input
      export * from "./select"; // Add this line
      ```

    c. Add example implementation:

    - Install required dependencies (if not already installed).

    ```bash
    npx shadcn@latest add button card
    ```

    - Copy the entire `select` directory from template's `src/app/` to your app directory.
    - This includes:
      - Select component implementation
      - Server action
      - Validation schema

4.  **Verification**

    After integration, verify your setup:

    - Components are properly exported from index files
    - All required dependencies are installed
    - File paths in your imports are correct
    - Example implementations work as expected

## 🔧 Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework with app router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[LocalForage](https://localforage.github.io/localForage/)** - Offline storage library
- **[Class Variance Authority](https://cva.style/)** - Component variant management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### How to Contribute

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

We maintain high standards for code quality and accessibility. Please follow these guidelines:

- Follow the existing code style and conventions
- Add proper TypeScript types where applicable
- Include tests for new features
- Update documentation for any API changes
- Ensure accessibility standards are maintained

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Happy coding! 🚀**

If you find this template helpful, please consider:

- Giving it a star ⭐
- Sharing it with others
- Contributing back to the project
