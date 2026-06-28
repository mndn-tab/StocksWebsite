
# Factory for the different types of repositories.
def create_repository(name, settings):
    if name == 'memory':
        from .memory import Repository
    elif name == 'sqldb':
        from .sqldb import Repository
    else:
        raise ValueError('Unknown repository.')
    return Repository(settings)
