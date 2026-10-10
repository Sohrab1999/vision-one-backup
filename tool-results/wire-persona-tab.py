# -*- coding: utf-8 -*-
# Task 8-b2: wire «persona» tab into tutor-view.tsx (ZWNJ-safe python edit)
import io

P = "/home/z/my-project/src/components/book/tutor-view.tsx"
src = io.open(P, encoding="utf-8").read()
orig_len = len(src)
Z = "\u200c"  # ZWNJ


def rep(s, old, new, n=1):
    c = s.count(old)
    if c != n:
        raise SystemExit(f"ANCHOR FAIL ({c}x, expected {n}): {old[:70]!r}")
    return s.replace(old, new, n)


# 1) add Users icon to lucide imports
src = rep(src, '  User,\n} from "lucide-react";', '  User,\n  Users,\n} from "lucide-react";')

# 2) import PersonaPanel after StoryPanel import
src = rep(
    src,
    'import { StoryPanel } from "./ai/story-panel";',
    'import { StoryPanel } from "./ai/story-panel";\nimport { PersonaPanel } from "./ai/persona-panel";',
)

# 3) extend TutorTab union
src = rep(
    src,
    'type TutorTab = "chat" | "teacher" | "story";',
    'type TutorTab = "chat" | "teacher" | "story" | "persona";',
)

# 4) insert persona item into TABS (before the array's closing "];")
i = src.index("const TABS")
j = src.index("\n];", i)
item = (
    "\n  {\n"
    '    id: "persona",\n'
    f'    label: "شخصیت{Z}ها",\n'
    "    icon: Users,\n"
    f'    hint: "با غریبه، هم{Z}کلاسی یا مسافر انگلیسی حرف بزن — با واژگان سطح خودت",\n'
    "  },"
)
src = src[:j] + item + src[j:]

# 5) add render branch
src = rep(
    src,
    '        {tab === "story" && <StoryPanel />}',
    '        {tab === "story" && <StoryPanel />}\n        {tab === "persona" && <PersonaPanel />}',
)

# 6) update header doc comment (tab count + persona mention)
src = rep(src, "دستیار هوشمند جزوه با سه تب (فاز ۸):", "دستیار هوشمند جزوه با چهار تب (فاز ۸):")
src = rep(
    src,
    "(ai/teacher-panel و ai/story-panel).",
    f"(ai/teacher-panel و ai/story-panel)؛ تب «شخصیت{Z}ها» چت مکالمه آزاد با سه شخصیت انگلیسی{Z}زبان است (ai/persona-panel).",
)

io.open(P, "w", encoding="utf-8").write(src)
print("OK len:", orig_len, "->", len(src))
