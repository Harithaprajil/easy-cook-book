// ...existing code...
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const RecipePage = () => {
  const location = useLocation();
  const state = location.state;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state) return;
    const { timeSlot, foodCategory, basket } = state;
    if (timeSlot && foodCategory && basket?.length) {
      getRecipe(timeSlot, foodCategory, basket);
    }
  }, [state]);

  const getRecipe = async (timeSlot, foodCategory, basket) => {
    setLoading(true);
    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeSlot, foodCategory, basket }),
      });
      if (!response.ok) throw new Error("Failed to fetch recipe");
      const data = await response.json();
      // backend sends data.recipe as parsed JSON (object) or a string fallback
      setRecipe(data.recipe ?? null);
    } catch (error) {
      console.error("Connection Error:", error);
      setRecipe({ error: "Sorry, the chef is busy. Please try again later!" });
    } finally {
      setLoading(false);
    }
  };

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-lg text-gray-600">Please go back and select ingredients 🍲</p>
      </div>
    );
  }

  const renderNutrition = (n) => {
    if (!n) return null;
    return (
      <div className="grid grid-cols-4 gap-4 text-sm mt-2">
        <div className="bg-orange-50 p-2 rounded text-center">
          <div className="font-semibold">Calories</div>
          <div>{n.calories ?? "-"}</div>
        </div>
        <div className="bg-orange-50 p-2 rounded text-center">
          <div className="font-semibold">Protein (g)</div>
          <div>{n.protein_g ?? "-"}</div>
        </div>
        <div className="bg-orange-50 p-2 rounded text-center">
          <div className="font-semibold">Carbs (g)</div>
          <div>{n.carbs_g ?? "-"}</div>
        </div>
        <div className="bg-orange-50 p-2 rounded text-center">
          <div className="font-semibold">Fat (g)</div>
          <div>{n.fat_g ?? "-"}</div>
        </div>
      </div>
    );
  };

  const renderSteps = (steps) => {
    if (!Array.isArray(steps) || !steps.length) {
      return <div className="text-sm text-gray-500">No actionable steps available.</div>;
    }
    return (
      <ol className="space-y-4">
        {steps.map((s) => (
          <li key={s.step_number} className="p-4 bg-gray-50 rounded border">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 font-semibold">
                {s.step_number}
              </div>
              <div className="flex-1">
                <div className="text-gray-800">{s.description}</div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
                  {s.estimated_time && <span className="px-2 py-1 bg-white rounded border">time: {s.estimated_time}</span>}
                  <span className="px-2 py-1 bg-white rounded border">accuracy: {s.accuracy_with_input ?? "-"}</span>
                  {s.tips?.length ? <span className="px-2 py-1 bg-white rounded border">tips: {s.tips.join("; ")}</span> : null}
                </div>
                {s.image ? (
                  <img src={s.image} alt={`step-${s.step_number}`} className="mt-3 w-full max-w-xs rounded shadow-sm" />
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Your Recipe 👨‍🍳</h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-10">
            <div className="animate-spin h-10 w-10 border-4 border-orange-600 border-t-transparent rounded-full mb-4"></div>
            <p className="text-orange-700 font-medium">Cooking your recipe... 🍳</p>
          </div>
        ) : (
          <>
            {/* If backend returned plain string or error object */}
            {typeof recipe === "string" || recipe?.error ? (
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">
                  {recipe?.error ?? recipe}
                </div>
              </div>
            ) : null}

            {/* If backend returned structured menus */}
            {recipe?.menus?.length ? (
              <div className="space-y-6">
                {recipe.menus.map((m, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-md border border-orange-100">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold text-orange-700">{m.recipe_name}</h2>
                        <div className="text-sm text-gray-600">{m.food_category} • {m.difficulty} • {m.estimated_time}</div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>Serves: <strong>{m.servings ?? "-"}</strong></div>
                        {m.video_url ? <a href={m.video_url} target="_blank" rel="noreferrer" className="text-orange-600 underline">Watch</a> : null}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-700">Ingredients</h3>
                        <ul className="list-disc list-inside text-gray-800 mt-2">
                          {(m.ingredients || []).map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-700">Nutrition</h3>
                        {renderNutrition(m.nutrition)}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-700 mb-3">Steps</h3>
                      {renderSteps(m.steps)}
                    </div>

                    {m.notes ? <div className="mt-4 text-sm text-gray-600">Notes: {m.notes}</div> : null}
                  </div>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
// ...existing code...