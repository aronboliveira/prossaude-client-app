import os
import re

def walk_dir(dirc):
  for root, _, files in os.walk(dirc):
    for file in files:
      if file.endswith(('.js', '.jsx', '.ts', '.tsx', '.vue')):
        sort_asc_imports(os.path.join(root, file))
def get_first_destructured(import_statement):
	match = re.search(r"\{\s*([^\s,]+)", import_statement)
	return match.group(1) if match else ""
def sort_asc_imports(path):
  with open(path, 'r') as file:
    content = file.read()
  imports = re.compile(r'^(import\s+.*?;\n)', re.MULTILINE).findall(content)
  no_def_imps = [];
  def_imps = [];
  alias_imps = [];
  for imp in imports:
    if re.search(r'^import\s+\{', imp) and re.search(r'\s*from\s+'):
      no_def_imps.append(imp)
    elif re.search(r'^import\s+\*\s+as', imp) and re.search(r'\s*from\s+'):
      alias_imps.append(imp)
    elif re.search(r'^import\s+', imp) and re.search(r'\s*from\s+'):
      def_imps.append(imp)
  sorted_imps = "".join([sorted(no_def_imps, key=get_first_destructured) +
                 sorted(def_imps, key=lambda imp: re.search(r"import\s+(\S+)", imp).group(1)) +
                 sorted(alias_imps, key=lambda imp: re.search(r"import\s+\*\s+as\s+(\S+)", imp).group(1))])
  with open(path, 'w') as file:
			file.write(sorted_imps + re.sub(r'^(import\s.*?;\n)+', '', content, flags=re.MULTILINE))

if __name__ == '__main__':
	walk_dir(input('Enter the directory path:'))