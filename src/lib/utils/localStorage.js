import localforage from "localforage";

export async function saveLocal(value, DRAFT_KEY) {
  try {
    await localforage.setItem(DRAFT_KEY, value);
  } catch (err) {
    console.error("Failed to save draft:", err);
  }
}

export async function getLocal(DRAFT_KEY) {
  try {
    const val = await localforage.getItem(DRAFT_KEY);
    return val || "";
  } catch (err) {
    console.error("Failed to get draft:", err);
    return "";
  }
}

export async function clearLocal(DRAFT_KEY) {
  try {
    await localforage.removeItem(DRAFT_KEY);
  } catch (err) {
    console.error("Failed to clear draft:", err);
  }
}
