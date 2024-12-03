import { createServer, Model, Response } from "miragejs";
import type { Employee } from "../types/employee";

const initialEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    position: "Senior Developer",
    department: "Engineering",
    joinDate: "2022-01-15",
    phoneNumber: "(555) 123-4567",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@company.com",
    position: "Product Manager",
    department: "Product",
    joinDate: "2021-08-20",
    phoneNumber: "(555) 234-5678",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@company.com",
    position: "UX Designer",
    department: "Design",
    joinDate: "2022-03-10",
    phoneNumber: "(555) 345-6789",
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.w@company.com",
    position: "Marketing Manager",
    department: "Marketing",
    joinDate: "2021-11-05",
    phoneNumber: "(555) 456-7890",
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    email: "david.b@company.com",
    position: "DevOps Engineer",
    department: "Engineering",
    joinDate: "2022-02-15",
    phoneNumber: "(555) 567-8901",
  },
  {
    id: "6",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.d@company.com",
    position: "HR Specialist",
    department: "Human Resources",
    joinDate: "2021-09-30",
    phoneNumber: "(555) 678-9012",
  },
  {
    id: "7",
    firstName: "Robert",
    lastName: "Wilson",
    email: "robert.w@company.com",
    position: "Financial Analyst",
    department: "Finance",
    joinDate: "2022-04-20",
    phoneNumber: "(555) 789-0123",
  },
  {
    id: "8",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.a@company.com",
    position: "Sales Director",
    department: "Sales",
    joinDate: "2021-07-12",
    phoneNumber: "(555) 890-1234",
  },
  {
    id: "9",
    firstName: "James",
    lastName: "Taylor",
    email: "james.t@company.com",
    position: "Quality Assurance",
    department: "Engineering",
    joinDate: "2022-01-25",
    phoneNumber: "(555) 901-2345",
  },
  {
    id: "10",
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.g@company.com",
    position: "Content Strategist",
    department: "Marketing",
    joinDate: "2021-10-08",
    phoneNumber: "(555) 012-3456",
  },
];

export function setupMirage() {
  return createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      initialEmployees.forEach((employee) => {
        server.create("employee", employee);
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/employees", (schema) => {
        return schema.all("employee");
      });

      this.get("/employees/:id", (schema, request) => {
        const id = request.params.id;
        return schema.find("employee", id);
      });

      this.post("/employees", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("employee", attrs);
      });

      this.put("/employees/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const employee = schema.find("employee", id);

        if (!employee) {
          return new Response(404, {}, { error: "Employee not found" });
        }

        return employee.update(attrs);
      });

      this.delete("/employees/:id", (schema, request) => {
        const id = request.params.id;
        const employee = schema.find("employee", id);

        if (!employee) {
          return new Response(404, {}, { error: "Employee not found" });
        }

        employee.destroy();
        return new Response(204);
      });
    },
  });
}
