"use client";
import { useState, useEffect } from "react";
import { useForm } from "@/hooks/useForm";
import { contactSchema } from "@/lib/validations";
import FormField from "@/components/FormField";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState([]);
  const [submitting, setSubmitting] = useState(false);


  const { values, errors, setValue, validate } = useForm(contactSchema, {
    name: "",
    email: "",
    phone: "",
  });


  // Load contacts on mount
  useEffect(() => {
    fetchContacts();
  }, []); 

  async function fetchContacts() {
    const res = await fetch("/api/contacts");
    const data = await res.json();
    setContacts(data);
    setLoading(false);
  }

  async function fetchContacts(query = "") {
    const res = await fetch(`api/contacts?search=${query}`, {cache: "no-store"});
    const data = await res.json();
    setContacts(data);
    setLoading(false);
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchContacts(search);
  }

  async function addContact() {
  // 1. Local Validation (Stop before even trying the network)
  if (!validate()) return;

  setSubmitting(true);

  try {
    // 2. The Network Request
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    // 3. Handle Server-Side Errors (e.g., 400 Bad Request, 500 Server Error)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to save contact");
    }

    // 4. Success Case
    setValue("name", "");
    setValue("email", "");
    setValue("phone", "");
    
    // Refresh the list so the new contact appears
    await fetchContacts(); 
    
    console.log("Contact added successfully!");

  } catch (err) {
    // 5. Catch Network Failures or Thrown Errors
    console.error("Error in addContact:", err.message);
    // Optional: setErrorMessage(err.message); 
    alert("Error: " + err.message);

  } finally {
    // 6. Always turn off the loading state, win or lose
    setSubmitting(false);
  }
}

  async function deleteContact(id) {
    await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    fetchContacts(); // refresh list
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Contacts</h1>

      {/* Add Contact Form */}
      <div className="border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Contact</h2>
        <div className="flex flex-col gap-3">

          <FormField label="Name" error={errors.name}>
            <input
              placeholder="Ana Silva"
              value={values.name}
              onChange={(e) => setValue("name", e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </FormField>

          <FormField label="Email" error={errors.email}>
            <input
              type="email"
              placeholder="ana@email.com"
              value={values.email}
              onChange={(e) => setValue("email", e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </FormField>

                    <FormField label="Phone (optional)" error={errors.phone}>
            <input
              placeholder="555-0101"
              value={values.phone}
              onChange={(e) => setValue("phone", e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </FormField>

          <button
            onClick={addContact}
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition font-medium"
          >
            {submitting ? "Saving..." : "Add Contact"}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={(e) => {setSearch(e.target.value);
            fetchContacts(e.target.value);// live search
          }}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Contact List */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="border border-gray-800 rounded-xl px-6 py-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{contact.name}</p>
                <p className="text-gray-400 text-sm">{contact.email}</p>
                {contact.phone && (
                  <p className="text-gray-500 text-xs">{contact.phone}</p>
                )}
              </div>
              <button
                onClick={() => deleteContact(contact.id)}
                className="text-red-400 hover:text-red-300 text-sm transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* WhatsApp Link */}
  <a 
    href="https://wa.me/254755112760?text=Hi%20Oloo%2C%20I%20found%20your%20contact%20on%20your%20portfolio%20website.%20I'd%20like%20to%20get%20in%20touch%20with%20you." 
    target="_blank" 
    rel="noopener noreferrer"
    className="px-6 py-3 bg-green-600 px-4 py-2 rounded-lg text-white"
  >
    Chat on WhatsApp
  </a>
    </main>
  );
}